import { Request, Response, NextFunction } from 'express';
import { WeatherService } from '../services/weatherService';
import logger from '../logger';

const weatherService = new WeatherService();

/** 
 * @swagger 
 * tags: 
 *  name: Weather 
 *  description: Weather management
 * /weather/location: 
 *  get: 
 *      summary: Get weather data for a location 
 *      tags: [Weather]
 *      parameters: 
 *          - in: query 
 *            name: longitude 
 *            required: true 
 *            schema: 
 *              type: number 
 *            description: The longitude to get weather data for 
 *          - in: query 
 *            name: latitude 
 *            required: true 
 *            schema: 
 *              type: number 
 *            description: The latitude to get weather data for 
 *      responses: 
 *          200: 
 *              description: Weather data 
 *          500: 
 *              description: Error message
 */
export const getWeatherByCoordinates = async (req: Request, res: Response, next: NextFunction) => {
    const { longitude, latitude } = req.query;
    logger.info(`Weather endpoint called for coordinates: longitude=${longitude}, latitude=${latitude}`);
    try {
        const weather = await weatherService.getWeatherByCoordinates(Number(longitude), Number(latitude));
        res.status(200).json(weather);
    } catch (err) {
        next(err);
    }
};

/** 
 * @swagger 
 * /weather/city-state: 
 *  get: 
 *      summary: Get weather data for a city and state 
 *      tags: [Weather]
 *      parameters:
 *          - in: query
 *            name: city
 *            required: true
 *            schema:
 *              type: string
 *            description: The city to get weather data for
 *          - in: query
 *            name: state
 *            required: true
 *            schema:
 *              type: string
 *            description: The state to get weather data for
 *      responses: 
 *          200: 
 *              description: Weather data 
 *          500: 
 *              description: Error message
 */
export const getWeatherByCityState = async (req: Request, res: Response, next: NextFunction) => {
    const { city, state } = req.query;
    logger.info(`Weather endpoint called for city: ${city}, state: ${state}`);
    try {
        const weather = await weatherService.getWeatherByCityState(city as string, state as string);
        res.status(200).json(weather);
    } catch (err) {
        next(err);
    }
};

/** 
 * @swagger 
 * /weather/coordinates: 
 *  get: 
 *      summary: Get coordinates for a city and state 
 *      tags: [Weather]
 *      parameters:
 *          - in: query
 *            name: city
 *            required: true
 *            schema:
 *              type: string
 *            description: The city to get coordinates for
 *          - in: query
 *            name: state
 *            required: true
 *            schema:
 *              type: string
 *            description: The state to get coordinates for
 *      responses: 
 *          200: 
 *              description: Coordinates data 
 *          500: 
 *              description: Error message
 */
export const getCoordinatesByCityState = async (req: Request, res: Response, next: NextFunction) => {
    const { city, state } = req.query;
    logger.info(`Coordinates endpoint called for city: ${city}, state: ${state}`);
    try {
        const coordinates = await weatherService.getCoordinatesByCityState(city as string, state as string);
        res.status(200).json(coordinates);
    } catch (err) {
        next(err);
    }
};