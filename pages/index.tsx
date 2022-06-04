import type { NextPage } from 'next'
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import FullPageLoader from "../components/LoadingSpinner/FullPageLoader";
import {userService} from "../services/user/service";

const Home: NextPage = () => {
    const router = useRouter();
    const [isLoading, setLoadingStatus] = useState(true);

    //componentDidMount / update
    useEffect(() => {
        if(!userService.isUserCached()) {
            router.push('/login');
        } else {
            setLoadingStatus(false);
        }
    }, []);

    if(isLoading) {
        return <FullPageLoader />;
    }

    return (
        <h2 className="text-3xl font-bold underline">Welcome Home<br/>{}</h2>
    )
}

export default Home
