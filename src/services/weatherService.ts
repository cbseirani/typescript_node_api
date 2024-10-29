import axios from 'axios';
import { Weather, IWeather } from '../models/weather';

export class WeatherService {
    async getWeather(location: string): Promise<IWeather> {
        const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=35&longitude=139&hourly=temperature_2m`);
        const temperature = response.data.hourly.temperature_2m[0]; // Simplified example

        const weather = new Weather({ location, temperature });
        await weather.save();
        return weather;
    }
}