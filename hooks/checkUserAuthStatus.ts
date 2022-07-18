import usePush from "../helper/routerWorkaround";
import {useUser} from "../context/user";
import {useEffect, useState} from "react";

function useCheckUserAuthStatus() {
    const [userAuthStatus, setUserAuthStatus] = useState<{id: "", username: "", password: "", name: ""} | null>(null);
    const push = usePush();
    const { user, isCached } = useUser();

    useEffect(() => {
        if(!isCached()) {
            push('/login');
        } else {
            const userElem: string | null = user;
            if (userElem !== null) {
                setUserAuthStatus(JSON.parse(userElem));
            }
        }
    }, [isCached, push, user]);

    return userAuthStatus;
}

export default useCheckUserAuthStatus;