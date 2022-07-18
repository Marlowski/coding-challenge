import {NextPage} from "next";
import Image from "next/image";
import BackgroundImg from '/public/assets/background-img.jpg'
import React, {Fragment, useState} from "react";
import { Transition } from '@headlessui/react'
import {useRouter} from "next/router";
import {useUser} from "../context/user";
import Link from "next/link";
import Header from "../components/Header";


const Login: NextPage = () => {
    const { user, login, logout } = useUser();
    const router = useRouter();
    const [loginUserCredentials, setLoginUserCredentials] = useState<CodingChallengeUserLoginData>({username: "", password: ""});
    const [wrongInput, setWrongInput] = useState(false);

    function changeHandler(inputOrigin: String, e: React.FormEvent<HTMLInputElement>) {
        const target = e.target as HTMLInputElement;
        if(inputOrigin === "username") {
            setLoginUserCredentials({username: target.value, password: loginUserCredentials.password})
        } else {
            setLoginUserCredentials({username: loginUserCredentials.username, password: target.value});
        }
    }

    function submitHandler(e: React.FormEvent<HTMLInputElement>) {
        e.preventDefault();
        setWrongInput(false);
        if(login(loginUserCredentials.username, loginUserCredentials.password)) {
            router.push('/');
        } else {
            setWrongInput(true);
        }
    }

    return(
        <>
            <Header userObject={user} logoutFunc={logout}/>
            <main className="h-[calc(100vh-70px)]">
                <section className="relative h-full flex justify-center items-center py-7">
                    <Image className="opacity-60" src={BackgroundImg} alt="Background image showing a code editor with code" layout="fill" />
                    <div className="h-full w-[550px] max-w-[95%] h-[80%] min-h-[400px] max-h-[700px] flex flex-col items-center justify-center p-4 shadow-md bg-primary bg-opacity-80 z-10">
                        <svg className="fill-white rounded-full bg-secondary p-2 mb-4" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="40" height="40">
                            <g><path d="M980.8,521.1L783.2,718.5c-12.2,12.2-32,12.2-44.2,0c-12.2-12.2-12.2-31.9,0-44.1L914.6,499L739,323.7c-12.2-12.2-12.2-31.9,0-44.1c12.2-12.2,32-12.2,44.2,0L980.8,477C993.1,489.2,993.1,508.9,980.8,521.1z M332.9,906.5c-9,15.7-28.9,21.1-44.5,12c-15.6-9-20.9-29.1-11.9-44.8L667.1,93.5c9-15.7,28.9-21.1,44.5-12c15.6,9.1,20.9,29.1,11.9,44.8L332.9,906.5z M261,718.5c-12.2,12.2-32,12.2-44.2,0L19.1,521.1C7,508.9,7,489.2,19.1,477l197.7-197.4c12.2-12.2,32-12.2,44.2,0c12.2,12.2,12.2,31.9,0,44.1L85.4,499L261,674.4C273.2,686.6,273.2,706.3,261,718.5z"/></g>
                        </svg>
                        <h2 className="text-5xl uppercase font-600 text-white mb-7">Login</h2>
                        <div className="w-full relative">
                            {user === null
                                ?
                                <form className="w-full flex justify-center items-center flex-col">
                                    <div className="mb-6 w-[60%] min-w[300px]">
                                        <input
                                            type="text"
                                            className="input"
                                            id="login-input__username"
                                            placeholder="Username"
                                            onChange={(e) => changeHandler("username", e)}
                                        />
                                    </div>
                                    <div className="mb-6 w-[60%] min-w[300px]">
                                        <input
                                            type="password"
                                            className="input"
                                            id="login-input__password"
                                            placeholder="Password"
                                            onChange={(e) => changeHandler("password", e)}
                                        />
                                    </div>

                                    <div className="text-center lg:text-left w-[40%] min-w[200px] mt-3">
                                        <input type="submit" value="Login" onClick={submitHandler} className="btn w-full bg-secondary cursor-pointer" />
                                    </div>
                                </form>
                                :
                                <div className="flex flex-col items-center">
                                    <p className="text-center text-white text-xl">You&apos;re already logged in.</p>
                                    <Link href="/">
                                        <a className="btn mt-6">Home</a>
                                    </Link>
                                </div>
                            }
                            <Transition
                                show={wrongInput}
                                as={Fragment}
                                enter="transition ease-in-out duration-300"
                                enterFrom="opacity-30 translate-y-[7px]"
                                enterTo="opacity-100 translate-y-0"
                            >
                                <p className="absolute bottom-[40px] w-full text-white text-center">Wrong username or password!</p>
                            </Transition>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Login