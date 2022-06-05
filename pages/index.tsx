import type { NextPage } from 'next'
import {Fragment, useEffect, useState} from "react";
import {useRouter} from "next/router";
import FullPageLoader from "../components/LoadingSpinner/FullPageLoader";
import {userService} from "../services/user/service";
import { Transition } from '@headlessui/react'
import Carousel from "../components/Carousel";

const Home: NextPage = () => {
    const router = useRouter();
    const [isLoading, setLoadingStatus] = useState(true);
    const [user, setUser] = useState({id: "", username: "", password: "", name: ""});
    const [counter, setCounter] = useState(0);
    const [btnCooldownActive, setBtnCooldown] = useState(false);
    const [triggerBtnAnimation, setTriggerBtnAnimation] = useState(true)

    //componentDidMount / update
    useEffect(() => {
        if(!userService.isUserCached()) {
            router.push('/login');
        } else {
            setLoadingStatus(false);
            const userElem: string | null = userService.getUser();
            if (userElem !== null) {
                setUser(JSON.parse(userElem));
            }
        }
    }, []);

    function increaseCounter() {
        setTriggerBtnAnimation(false);
        resetBtnTrigger();

        setCounter(counter + 1);
        setBtnCooldown(true);
        setTimeout(() => {
            setBtnCooldown(false);
        }, 30400);
    }

    function resetBtnTrigger() {
        setTimeout(() => {
            setTriggerBtnAnimation(true);
        }, 200)
    }

    if(isLoading) {
        return <FullPageLoader />;
    }

    return (
        <>
            <div className="flex flex-col items-center justify-start h-auto pt-10 px-4 mb-[80px] mt-[20px] md2:flex-row md2:flex-wrap md2:justify-around md2:items-start">
                <div className="flex-auto min-w-[20em] pb-7 md2:pb-0 md2:order-2">
                    <h2 className="text-3xl font-bold text-white text-center lg:text-5xl">Welcome back<br/>{user.name}</h2>
                </div>
                <div className="flex-auto min-w-[calc(33%-1rem)] min-h-[72px] text-center pb-7 md2:pb-0 md2:order-3">
                    <Transition
                        show={triggerBtnAnimation}
                        enter="transform transition duration-[400ms]"
                        enterFrom="opacity-0 scale-50"
                        enterTo="opacity-100 scale-100"
                        leave="transform transition duration-[100ms]"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-50"
                    >
                        <button onClick={increaseCounter} disabled={btnCooldownActive} className="relative bg-primary hover:bg-primaryHover disabled:hover:none disabled:bg-gray-500 transition-colors pl-6 pr-7 py-2.5 rounded text-white overflow-hidden">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-linear duration-[30s]"
                                enterFrom="w-full"
                                enterTo="w-0"
                            >
                                <div className="absolute top-0 left-0 h-full w-0 bg-green-600 z-0"></div>
                            </Transition.Child>
                            <p className="z-10 relative">Increase me!</p>
                            <span className="text-tertiary inline-block min-w-[30px] absolute top-[7px] right-[-6px] text-[.7rem] text-left z-10">{counter}</span>
                        </button>
                    </Transition>
                </div>
                <div className="flex-auto min-w-[15em] text-center pb-7 md2:pb-0 md2:order-1">
                    <p>Weatherforcast</p>
                </div>
            </div>
            <div className="mb-[50px] w-full pl-[10px] flex flex-col items-center relative">
                <Carousel />
            </div>
        </>
    )
}

export default Home
