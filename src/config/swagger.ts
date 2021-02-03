import swaggerJSDoc from 'swagger-jsdoc';
import { PORT } from '~/constants/config';

const localServer = {
  url: `http://localhost:${PORT}`,
};

const swaggerOptions: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.1',
    info: {
      title: 'YOUR_APP_NAME_HERE',
      version: '0.0.1',
      description: 'YOUR_APP_DESCRIPTION_HERE',
    },
    servers: [localServer],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  },
  apis: ['src/api/v1/**/**/*.yml', 'src/api/v1/**/*.ts', 'src/models/_swagger_/*.yml'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default swaggerDocs;
