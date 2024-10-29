import { Request, Response } from 'express';
import logger from '../logger'

/** 
 * @swagger 
 * /health: 
 *  get: 
 *      summary: Returns the health status 
 *      responses: 
 *          200: 
 *              description: Healthy status 
 */
export const healthController = (req: Request, res: Response) => {
    logger.info('Health check endpoint called');
    res.status(200).json({ status: 'Healthy', uptime: process.uptime() });
};