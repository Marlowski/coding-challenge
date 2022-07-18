import {useEffect, useState} from "react";

function useQueryWeatherDataAPI() {
    const [weatherData, setWeatherData] = useState<{temp: string | null, loading: boolean}>({temp: null, loading: false});

    useEffect(() => {
        setWeatherData({temp: null, loading: true});
        getWeatherData()
            .then((res) => {
                if(res.cod === 200) {
                    setWeatherData({temp: Number(res.main.temp).toFixed(1), loading: false});
                } else {
                    setWeatherData({temp: null, loading: false});
                }
            });
    }, []);

    async function getWeatherData() {
        const res = await fetch("/api/weather", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "GET",
        });
        return await res.json();
    }

    return weatherData;
}

export default useQueryWeatherDataAPI;