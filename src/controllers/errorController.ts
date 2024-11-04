import { Request, Response, NextFunction } from 'express';
import { ErrorService } from '../services/errorService';

const errorService = new ErrorService();

/** 
 * @swagger 
 * tags: 
 *  name: Error 
 *  description: Error handling test
 * /error/404: 
 *  get: 
 *      summary: Returns NotFound Error
 *      tags: [Error] 
 *      responses: 
 *          404: 
 *              description: Returns NotFound Error
 * /error/400: 
 *  get: 
 *      summary: Returns NotValid Error 
 *      tags: [Error] 
 *      responses: 
 *          400: 
 *              description: Returns NotValid Error
 * /error/401: 
 *  get: 
 *      summary: Returns Unauthorized Error 
 *      tags: [Error] 
 *      responses: 
 *          401: 
 *              description: Returns Unauthorized Error
 * /error/403: 
 *  get: 
 *      summary: Returns Forbidden Error 
 *      tags: [Error] 
 *      responses: 
 *          403: 
 *              description: Returns Forbidden Error
 */
export const get404 = async (req: Request, res: Response, next: NextFunction) => {
    await errorService.ThrowNotFound().catch(next);
};

export const get400 = async (req: Request, res: Response, next: NextFunction) => {
    await errorService.ThrowNotValid().catch(next);
};

export const get401 = async (req: Request, res: Response, next: NextFunction) => {
    await errorService.ThrowUnauthorized().catch(next);
};

export const get403 = async (req: Request, res: Response,next: NextFunction) => {
    await errorService.ThrowForbidden().catch(next);
}