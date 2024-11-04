import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { NotFoundError } from '../errors/notFoundError';
import { NotValidError } from '../errors/notValidError';
import { ForbiddenError } from '../errors/forbiddenError';
import { UnauthorizedError } from '../errors/unauthorizedError';
import logger from '../logger'

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    logger.error(`Error: ${err.message}`);

    switch (err.constructor) { 
        case NotFoundError:
        case NotValidError: 
        case ForbiddenError: 
        case UnauthorizedError: 
            res.status(err.statusCode).json({ error: err.message }); 
            break; 
        default: 
            res.status(500).json({ error: 'An unexpected error occurred' }); break; 
    }

    next();
};