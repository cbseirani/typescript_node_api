import express, { ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express'; 
import { healthController } from './controllers/healthController';
import { getWeatherByCoordinates, getWeatherByZipCode, getCoordinatesByZipCode } from './controllers/weatherController';
import { get404, get400, get401, get403 } from './controllers/errorController';
import { errorHandler } from './middleware/errorHandler';
console.log('About to load');
const swaggerDocs = require('./swagger');

const app = express();

// swagger
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
console.log('Swagger loaded');

// mongodb
console.log('connecting  mongodb...');
mongoose.connect('mongodb://127.0.0.1:27017/WeatherDB');
console.log('mongodb connected.');

// routes
console.log('loading routes...');
app.get('/health', healthController);
app.get('/user-weather', getUserWeatherCollection);
app.delete('/user-weather', deleteUserWeatherCollection);
app.get('/weather/location', getWeatherByCoordinates);
app.get('/weather/zipcode', getWeatherByZipCode);
app.get('/weather/coordinates', getCoordinatesByZipCode);
app.get('/error/404', get404);
app.get('/error/400', get400);
app.get('/error/401', get401);
app.get('/error/403', get403);
console.log('routes loaded.');

// middleware 
app.use(errorHandler as ErrorRequestHandler);

export default app;