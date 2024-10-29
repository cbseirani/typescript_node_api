import { Request, Response } from 'express';

/** 
 * @swagger 
 * /error/404: 
 *  get: 
 *      summary: Returns NotFound Error 
 *      responses: 
 *          404: 
 *              description: Returns NotFound Error
  * /error/400: 
 *  get: 
 *      summary: Returns NotValid Error 
 *      responses: 
 *          400: 
 *              description: Returns NotValid Error
 */
export const errorController = (req: Request, res: Response) => {
    res.status(200).json({ status: 'Healthy', uptime: process.uptime() });
};