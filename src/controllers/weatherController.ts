import { Request, Response } from 'express';
import { WeatherService } from '../services/weatherService';
import logger from '../logger'

const weatherService = new WeatherService();

/** 
 * @swagger 
 * tags: 
 *  name: Weather 
 *  description: Weather management
 * /weather/{location}: 
 *  get: 
 *      summary: Get weather data for a location 
 *      tags: [Weather]
 *      parameters: 
 *          - in: path 
 *            name: location 
 *            required: true 
 *            schema: 
 *              type: string 
 *            description: The location to get weather data for 
 *      responses: 
 *          200: 
 *              description: Weather data 
 *          500: 
 *              description: Error message
*/
export const getWeather = async (req: Request, res: Response) => {
    const { location } = req.params;
    logger.info(`Weather endpoint called for location: ${req.params.location}`);
    const weather = await weatherService.getWeather(location);
    res.status(200).json(weather);
};