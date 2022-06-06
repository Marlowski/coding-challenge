import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    data: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const lat = 52.520008;
    const lon = 13.404954;
    await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.WEATHER_API_KEY}`
    ).then((response) => response.json())
        .then(data => {
            if(data.cod === 200) {
                res.status(200).json(data);
            } else {
                res.status(data.cod).json(data)
            }
        });
}