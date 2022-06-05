async function getStaticProps() {
    //Berlin lat,lon
    const lat = 52.520008;
    const lon = 13.404954;
    return await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=s${process.env.WEATHER_API_KEY}`)
        .then((res) => res.json())
        .then((data) => {
            return data;
        })
        .catch((error) => {
            return error;
        })
}

export const weatherService = {
    getStaticProps,
}