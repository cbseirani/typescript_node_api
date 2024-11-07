import axios from 'axios';
import { Weather, IWeather } from '../models/weather';
import { WeatherCollection, IWeatherCollection } from '../models/weatherCollection';
import logger from '../logger';
import { inspect } from 'util';

export interface IWeatherService {
    getWeatherByCoordinates(userGuid: string, longitude: number, latitude: number): Promise<IWeather>;
    getWeatherByZipCode(userGuid: string, zipCode: string): Promise<IWeather>;
    getCoordinatesByZipCode(zipCode: string): Promise<{ latitude: number, longitude: number }>;
}

export class WeatherService {
    async getWeatherByCoordinates(userGuid: string, longitude: number, latitude: number): Promise<IWeather> {
        const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`);
        
        const weatherData = response.data.hourly.temperature_2m[0]; // Simplified example
        const location = `${latitude}, ${longitude}`;
        const name = 'Example Location'; // Placeholder value, you might want to get this from another source
        const country_code = 'US'; // Placeholder value
        const timezone = 'America/New_York'; // Placeholder value

        const weather = new Weather({
            location,
            temperature: weatherData.temperature,
            latitude,
            longitude,
            name,
            country_code,
            timezone,
            timestamp: new Date()
        });

        await weather.save();

        // Check if the user already has a WeatherCollection
        let weatherCollection = await WeatherCollection.findOne({ userGuid });

        if (weatherCollection) {
            // Update existing collection
            weatherCollection.weathers.push(weather._id as typeof Weather.prototype._id);
        } else {
            // Create new collection
            weatherCollection = new WeatherCollection({
                userGuid,
                weathers: [weather._id]
            });
        }

        await weatherCollection.save();

        return weather;
    }

    async getWeatherByZipCode(userGuid: string, zipCode: string): Promise<IWeather> {
        logger.info(`Starting to get weather by ZIP code ${zipCode}`);

        const geoResponse = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${zipCode}&count=1&language=en&format=json`);
        logger.info(`Response data: ${inspect(geoResponse.data, { depth: null, colors: true })}`);

        const { latitude, longitude } = geoResponse.data.results[0];
        return this.getWeatherByCoordinates(userGuid, longitude, latitude);
    }

    async getCoordinatesByZipCode(zipCode: string): Promise<{ latitude: number, longitude: number }> {
        const geoResponse = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${zipCode}&count=1&language=en&format=json`);
        const { latitude, longitude } = geoResponse.data.results[0];

        return { latitude, longitude };
    }
}