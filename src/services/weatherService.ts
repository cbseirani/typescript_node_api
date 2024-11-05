// import axios from 'axios';
// import { Weather, IWeather } from '../models/weather';

// export class WeatherService {
//     async getWeather(location: string): Promise<IWeather> {
//         const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=35&longitude=139&hourly=temperature_2m`);
//         const temperature = response.data.hourly.temperature_2m[0]; // Simplified example

//         const weather = new Weather({ location, temperature });
//         await weather.save();
//         return weather;
//     }
// }

import axios from 'axios';
import { Weather, IWeather } from '../models/weather';

export class WeatherService {
    async getWeatherByCoordinates(longitude: number, latitude: number): Promise<IWeather> {
        const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`);
        const temperature = response.data.hourly.temperature_2m[0]; // Simplified example

        const weather = new Weather({ location: `${latitude}, ${longitude}`, temperature });
        await weather.save();
        return weather;
    }

    async getWeatherByCityState(city: string, state: string): Promise<IWeather> {
        const geoResponse = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${city},${state}&count=1`);
        const { latitude, longitude } = geoResponse.data.results[0];

        return this.getWeatherByCoordinates(longitude, latitude);
    }

    async getCoordinatesByCityState(city: string, state: string): Promise<{ latitude: number, longitude: number }> {
        const geoResponse = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${city},${state}&count=1`);
        const { latitude, longitude } = geoResponse.data.results[0];

        return { latitude, longitude };
    }
}