import Link from 'next/link';
import {useEffect, useState} from "react";
import {userService} from "../services/user/service";

export default function Header() {
    const[isUserCachedState, setUserCachedState] = useState(false);

    useEffect(() => {
       setUserCachedState(userService.isUserCached());
    });

    function handleLogout() {
        userService.logout();
    }

    return (
        <nav className="flex items-center justify-between flex-wrap bg-primary p-4 z-50 relative min-h-[70px]">
            <div className="flex items-center flex-shrink-0 text-white mr-7">
                <svg className="fill-white -mb-1 mr-1" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="20" height="20">
                    <g><path d="M980.8,521.1L783.2,718.5c-12.2,12.2-32,12.2-44.2,0c-12.2-12.2-12.2-31.9,0-44.1L914.6,499L739,323.7c-12.2-12.2-12.2-31.9,0-44.1c12.2-12.2,32-12.2,44.2,0L980.8,477C993.1,489.2,993.1,508.9,980.8,521.1z M332.9,906.5c-9,15.7-28.9,21.1-44.5,12c-15.6-9-20.9-29.1-11.9-44.8L667.1,93.5c9-15.7,28.9-21.1,44.5-12c15.6,9.1,20.9,29.1,11.9,44.8L332.9,906.5z M261,718.5c-12.2,12.2-32,12.2-44.2,0L19.1,521.1C7,508.9,7,489.2,19.1,477l197.7-197.4c12.2-12.2,32-12.2,44.2,0c12.2,12.2,12.2,31.9,0,44.1L85.4,499L261,674.4C273.2,686.6,273.2,706.3,261,718.5z"/></g>
                </svg>
                <span className="font-semibold text-xl tracking-tight">Coding Challenge</span>
            </div>
            <div className="flex-grow flex items-center w-auto">
                <div className="text-sm flex-grow -mb-1">
                    <a href="https://github.com/Marlowski/coding-challenge" target="_blank" className="mt-4 inline-block btn-secondary">Repository</a>
                </div>
                <div>
                    {isUserCachedState &&
                        <Link href="/login">
                            <a className="btn" onClick={handleLogout}>Logout</a>
                        </Link>
                    }
                </div>
            </div>
        </nav>
    )
}