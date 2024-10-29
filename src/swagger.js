const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Weather API',
      version: '1.0.0',
      description: 'API for weather data',
      contact: {
        name: 'Your Name',
        email: 'your.email@example.com',
        url: 'https://example.com',
      },
    },
  },
  apis: ['./src/controllers/*.ts'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

module.exports = swaggerDocs;