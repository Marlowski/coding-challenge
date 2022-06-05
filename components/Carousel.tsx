import data from '../data/carouselContentList.json';
import {useEffect, useRef, useState} from "react";
import {randomColor} from "../helper/randomColor";

export default function Carousel() {
    const maxScrollWidth = useRef(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [colorSet, setColorSet] = useState(Array<string>(data.length).fill("rgb(0,0,0)"));
    const carousel = useRef<HTMLDivElement>(null);
    const toleranceValue = 50;

    function movePrev() {
        if(currentIndex > 0) {
            setCurrentIndex((prevState) => prevState - 1);
        }
    }

    function moveNext() {
        //50(px) as tolerance value to prevent another nextMove although the carousel is already at the end
        if(carousel.current !== null && carousel.current.offsetWidth * currentIndex < (maxScrollWidth.current - toleranceValue)) {
            setCurrentIndex((prevState) => prevState + 1);
        }
    }

    function isDisabled(dir: string) {
        if (dir === 'prev') {
            return currentIndex <= 0;
        }

        if (dir === 'next' && carousel.current !== null) {
            return (carousel.current.offsetWidth * currentIndex > (maxScrollWidth.current - toleranceValue));
        }

        return false;
    }

    useEffect(() => {
        if (carousel !== null && carousel.current !== null) {
            carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
        }
    }, [currentIndex]);

    useEffect(() => {
        maxScrollWidth.current = carousel.current
            ? carousel.current.scrollWidth - carousel.current.offsetWidth
            : 0;
    }, []);

    function setHeaderColor(index: number): string {
        return  colorSet[index];
    }

    function genColorSet() {
        const newSet = new Array<string>(data.length);
        for(let i=0; i<=data.length; i++) {
            newSet[i] = randomColor();
        }
        setColorSet(newSet);
    }

    return (
        <div className="relative max-w-[calc(300px*3+2*1.25rem)] w-full">
            <button onClick={movePrev} disabled={isDisabled('prev')} className="slider-btn lg:left-[-45px] left-4 pr-[3px]">&#9664;</button>
            <button onClick={moveNext} disabled={isDisabled('next')} className="slider-btn lg:right-[-45px] right-4 pl-[3px]">&#9654;</button>
            <div ref={carousel} className="flex gap-5 scroll-smooth w-full overflow-hidden relative snap-x snap-mandatory touch-pan-x z-0">
                {data.map((elem, index) => {
                    return (
                        <div key={index} className="min-w-[calc(100%-10px)] sm:min-w-[300px] min-h-[400px] shadow-md bg-primary snap-start">
                            <div className="h-[350px] sm:h-[200px] overflow-hidden">
                                <img src={elem.imgUrl} alt={elem.headline + " Impression"} className="min-w-full h-full" />
                            </div>
                            <div className="px-4 mt-6 pb-6">
                                <h3 style={{color: setHeaderColor(index)}} className="text-2xl font-bold mb-0.5">{elem.headline}</h3>
                                <p className="leading-5 min-h-[150px] sm:min-h-[200px]">{elem.text}</p>
                            </div>
                            <div className="w-full flex justify-center">
                                <button onClick={genColorSet} className="w-[80%] mx-5 mb-5 text-white py-2 bg-secondary rounded hover:bg-gray-700 transition-colors">Click Me</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}