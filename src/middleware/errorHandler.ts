import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { NotFoundError } from '../errors/notFoundError';
import { NotValidError } from '../errors/notValidError';
import logger from '../logger'

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    logger.error(`Error: ${err.message}`);

    if (err instanceof NotFoundError) {
        res.status(404).json({ error: err.message });
    } else if (err instanceof NotValidError) {
        res.status(400).json({ error: err.message });
    } else {
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
    next();
};