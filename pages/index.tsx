import type { NextPage } from 'next'
import {Fragment, useEffect, useState} from "react";
import FullPageLoader from "../components/LoadingSpinner/FullPageLoader";
import { Transition } from '@headlessui/react'
import Carousel from "../components/Carousel";
import {weatherService} from "../services/weather/service";
import LoadingSpinner from "../components/LoadingSpinner";
import usePush from "../helper/routerWorkaround";
import {useUser} from "../context/user";
import {userService} from "../services/user/service";

const Home: NextPage = () => {
    const push = usePush();
    const { isUserCached, user } = useUser();
    const [isLoading, setLoadingStatus] = useState(true);
    const [weatherIsLoading, setWeatherLoadingStatus] = useState(false);
    const [weatherData, setWeatherData] = useState({temp: "--"});
    const [userElem, setUserElem] = useState({id: "", username: "", password: "", name: ""});
    const [counter, setCounter] = useState(0);
    const [btnCooldownActive, setBtnCooldown] = useState(false);
    const [triggerBtnAnimation, setTriggerBtnAnimation] = useState(true)

    useEffect(() => {
        if(!isUserCached()) {
            push('/login');
        } else {
            setLoadingStatus(false);
            const userElem: string | null = user;
            if (userElem !== null) {
                setUserElem(JSON.parse(userElem));
            }
        }
    }, [isUserCached, push, user]);

    //componentDidMount (currently fires twice cause of strict mode)
    useEffect(() => {
        setWeatherLoadingStatus(true);
        weatherService.getStaticProps().then((res) => {
            if(res.cod === 200 && res.error === undefined) {
                setWeatherData({temp: Number(res.main.temp).toFixed(1)});
                //setWeatherData({temp: (res.main.temp).toFixed(1)});
            }
            setWeatherLoadingStatus(false);
        });
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
            <div className="flex flex-col items-center justify-start h-auto pt-10 px-4 mb-[80px] mt-[20px] lg:flex-row lg:flex-wrap lg:justify-around lg:items-start">
                <div className="flex-[1_1_33%] min-w-[20em] pb-7 lg:pb-0 lg:order-2">
                    <h2 className="text-4xl font-bold text-white text-center lg:text-5xl">Welcome back<br/>{userElem.name}</h2>
                </div>
                <div className="flex-[1_1_33%] min-w-[calc(33%-1rem)] min-h-[72px] text-center pb-7 lg:pb-0 lg:order-3">
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
                <div className="relative flex-[1_1_33%] min-w-[15em] text-center pb-7 lg:pb-0 lg:order-1">
                    <Transition
                        show={weatherIsLoading}
                        as={Fragment}
                        enter="transition duration-[200ms]"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition duration-[200ms]"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="absolute z-50 left-0 top-0 w-full bottom-0 backdrop-blur-sm flex justify-center items-center rounded bg-gray-700 bg-opacity-5">
                            <LoadingSpinner />
                        </div>
                    </Transition>
                    <h3 className="text-white text-xl">Weather Berlin</h3>
                    <p className="text-white text-xl">{weatherData.temp} °C</p>
                </div>
            </div>
            <div className="mb-[50px] w-full pl-[10px] flex flex-col items-center relative">
                <Carousel />
            </div>
        </>
    )
}

export default Home
