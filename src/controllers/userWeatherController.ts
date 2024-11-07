import { Request, Response, NextFunction } from 'express';
import { WeatherCollection } from '../models/weatherCollection';
import logger from '../logger';

/**
 * @swagger
 * /user-weather:
 *   get:
 *     summary: Retrieve a user's weather collection
 *     tags: [UserWeather]
 *     parameters:
 *       - in: query
 *         name: userGuid
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's GUID to retrieve their weather collection
 *     responses:
 *       200:
 *         description: User's weather collection
 *       404:
 *         description: User's weather collection not found
 *       500:
 *         description: Error message
 */
export const getUserWeatherCollection = async (req: Request, res: Response, next: NextFunction) => {
    const { userGuid } = req.query;
    logger.info(`Retrieve weather collection endpoint called for userGuid: ${userGuid}`);
    try {
        const weatherCollection = await WeatherCollection.findOne({ userGuid }).populate('weathers');
        if (!weatherCollection) {
            return res.status(404).json({ message: 'Weather collection not found for the given userGuid' });
        }
        res.status(200).json(weatherCollection);
    } catch (err) {
        next(err);
    }
};

/**
 * @swagger
 * /user-weather:
 *   delete:
 *     summary: Delete a user's weather collection
 *     tags: [UserWeather]
 *     parameters:
 *       - in: query
 *         name: userGuid
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's GUID to delete their weather collection
 *     responses:
 *       200:
 *         description: User's weather collection deleted
 *       404:
 *         description: User's weather collection not found
 *       500:
 *         description: Error message
 */
export const deleteUserWeatherCollection = async (req: Request, res: Response, next: NextFunction) => {
    const { userGuid } = req.query;
    logger.info(`Delete weather collection endpoint called for userGuid: ${userGuid}`);
    try {
        const weatherCollection = await WeatherCollection.findOneAndDelete({ userGuid });
        if (!weatherCollection) {
            return res.status(404).json({ message: 'Weather collection not found for the given userGuid' });
        }
        res.status(200).json({ message: 'Weather collection deleted successfully' });
    } catch (err) {
        next(err);
    }
};
