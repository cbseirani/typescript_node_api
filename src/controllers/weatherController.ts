import { Request, Response, NextFunction } from 'express';
import { WeatherService } from '../services/weatherService';
import logger from '../logger';

const weatherService = new WeatherService();

const userGuid = '5922ba4c-dfc1-46e7-9c7c-b780692663f9'; // TODO: fix hardcoded userguid

/**
 * @swagger
 * /weather/location:
 *   get:
 *     summary: Get weather data for a location
 *     tags: [Weather]
 *     parameters:
 *       - in: query
 *         name: longitude
 *         required: true
 *         schema:
 *           type: number
 *         description: The longitude to get weather data for
 *       - in: query
 *         name: latitude
 *         required: true
 *         schema:
 *           type: number
 *         description: The latitude to get weather data for
 *     responses:
 *       200:
 *         description: Weather data
 *       500:
 *         description: Error message
 */
export const getWeatherByCoordinates = async (req: Request, res: Response, next: NextFunction) => {
    const { longitude, latitude } = req.query;
    logger.info(`Weather endpoint called for coordinates: longitude=${longitude}, latitude=${latitude}`);
    try {
        const weather = await weatherService.getWeatherByCoordinates(userGuid as string, Number(longitude), Number(latitude));
        res.status(200).json(weather);
    } catch (err) {
        next(err);
    }
};

/**
 * @swagger
 * /weather/zipcode:
 *   get:
 *     summary: Get weather data for a ZIP code
 *     tags: [Weather]
 *     parameters:
 *       - in: query
 *         name: zipCode
 *         required: true
 *         schema:
 *           type: string
 *         description: The ZIP code to get weather data for
 *     responses:
 *       200:
 *         description: Weather data
 *       500:
 *         description: Error message
 */
export const getWeatherByZipCode = async (req: Request, res: Response, next: NextFunction) => {
    const { zipCode } = req.query;
    logger.info(`Weather endpoint called for ZIP code: ${zipCode}`);
    try {
        const weather = await weatherService.getWeatherByZipCode(userGuid as string, zipCode as string);
        res.status(200).json(weather);
    } catch (err) {
        next(err);
    }
};

/**
 * @swagger
 * /weather/coordinates:
 *   get:
 *     summary: Get coordinates for a ZIP code
 *     tags: [Weather]
 *     parameters:
 *       - in: query
 *         name: zipCode
 *         required: true
 *         schema:
 *           type: string
 *         description: The ZIP code to get coordinates for
 *     responses:
 *       200:
 *         description: Coordinates data
 *       500:
 *         description: Error message
 */
export const getCoordinatesByZipCode = async (req: Request, res: Response, next: NextFunction) => {
    const { zipCode } = req.query;
    logger.info(`Coordinates endpoint called for ZIP code: ${zipCode}`);
    try {
        const coordinates = await weatherService.getCoordinatesByZipCode(zipCode as string);
        res.status(200).json(coordinates);
    } catch (err) {
        next(err);
    }
};
