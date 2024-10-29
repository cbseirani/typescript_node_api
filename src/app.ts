import express, { ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express'; 
import { healthController } from './controllers/healthController';
import { getWeather } from './controllers/weatherController';
import { errorHandler } from './middleware/errorHandler';
const swaggerDocs = require('./swagger');

const app = express();

// swagger
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// middleware 
app.use(errorHandler as ErrorRequestHandler);

// mongodb
mongoose.connect('mongodb://127.0.0.1:27017/NODEweatherDB');

// routes
app.get('/health', healthController);
app.get('/weather/:location', getWeather);

export default app;