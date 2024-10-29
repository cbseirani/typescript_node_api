import { Request, Response } from 'express';
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
 */
export const get404 = (req: Request, res: Response) => {
    errorService.ThrowNotFound();
};

export const get400 = (req: Request, res: Response) => {
    errorService.ThrowNotValid();
};