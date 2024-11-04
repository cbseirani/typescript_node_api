import express, { ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express'; 
import { healthController } from './controllers/healthController';
import { getWeather } from './controllers/weatherController';
import { get404, get400, get401, get403 } from './controllers/errorController';
import { errorHandler } from './middleware/errorHandler';
const swaggerDocs = require('./swagger');

const app = express();

// swagger
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// mongodb
mongoose.connect('mongodb://127.0.0.1:27017/NODEweatherDB');

// routes
app.get('/health', healthController);
app.get('/weather/:location', getWeather);
app.get('/error/404', get404);
app.get('/error/400', get400);
app.get('/error/401', get401);
app.get('/error/403', get403);

// middleware 
app.use(errorHandler as ErrorRequestHandler);

export default app;