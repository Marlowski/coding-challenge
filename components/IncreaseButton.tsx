import {Fragment, useState} from "react";
import {Transition} from "@headlessui/react";
import React from "react";

export default function IncreaseButton() {
    const [counter, setCounter] = useState(0);
    const [btnCooldownActive, setBtnCooldown] = useState(false);
    const [triggerBtnAnimation, setTriggerBtnAnimation] = useState(true);

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

    return (
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
    )
}