import type {NextPage} from 'next'
import {Fragment} from "react";
import FullPageLoader from "../components/LoadingSpinner/FullPageLoader";
import {Transition} from '@headlessui/react'
import Carousel from "../components/Carousel";
import LoadingSpinner from "../components/LoadingSpinner";
import {useUser} from "../context/user";
import Header from "../components/Header";
import useCheckUserAuthStatus from "../hooks/checkUserAuthStatus";
import useQueryWeatherDataAPI from "../hooks/queryWeatherDataAPI";
import IncreaseButton from "../components/IncreaseButton";

const Home: NextPage = () => {
    const userData = useCheckUserAuthStatus();
    const weatherData = useQueryWeatherDataAPI();
    const { logout } = useUser();

    if(userData === null) {

        return <FullPageLoader />;
    }

    return (
        <>
            <Header userObject={JSON.stringify(userData)} logoutFunc={logout}/>
            <main className="h-[calc(100vh-70px)]">
                <div className="flex flex-col items-center justify-start h-auto pt-10 px-4 mb-[80px] mt-[20px] lg:flex-row lg:flex-wrap lg:justify-around lg:items-start">
                    <div className="flex-[1_1_33%] min-w-[20em] pb-7 lg:pb-0 lg:order-2">
                        <h2 className="text-4xl font-bold text-white text-center lg:text-5xl">Welcome back {userData.name}</h2>
                    </div>
                    <div className="flex-[1_1_33%] min-w-[calc(33%-1rem)] min-h-[72px] text-center pb-7 lg:pb-0 lg:order-3">
                        <IncreaseButton />
                    </div>
                    <div className="relative flex-[1_1_33%] min-w-[15em] text-center pb-7 lg:pb-0 lg:order-1">
                        <Transition
                            show={weatherData.loading}
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
                        {weatherData.temp === null
                        ? <p className="text-white text-xl">-- °C</p>
                        : <p className="text-white text-xl">{weatherData.temp} °C</p>
                        }
                    </div>
                </div>
                <div className="mb-[50px] w-full pl-[10px] flex flex-col items-center relative">
                    <Carousel />
                </div>
            </main>
        </>
    )
}

export default Home
