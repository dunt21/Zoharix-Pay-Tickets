import swaggerJsdoc from 'swagger-jsdoc';
import { serverConfig } from './server';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Z-Events API Documentation',
            version: '1.0.0',
            description: 'The complete API reference for the Z-Events platform.',
            contact: {
                name: 'Zoharix Tech Support',
                url: 'https://www.zoharix.tech',
            },
        },
        servers: [
            {
                url: serverConfig.baseUrl || `http://localhost:${serverConfig.port}`,
                description: 'Current Environment Server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/*.ts', './src/models/*.ts'], // Path to the API docs
};

export const swaggerSpec = swaggerJsdoc(options);
