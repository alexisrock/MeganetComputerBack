// src/config/swagger.config.ts

import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0', // Especifica la versión de OpenAPI (Swagger)
    info: {
      title: 'API de Meganet', // Título de tu API
      version: '1.0.0', // Versión de tu API
    },
    components: {
      schemas: {
        AuthenticatorRequest: {
          type: 'object',
          properties: {
            
            email: { type: 'string', example: 'example@getMaxListeners.com' },
            pass: { type: 'string', example: 'e12345' }, 
          },
        },
        TokenResposne:{
            type: 'object',
            properties: {
              
                token: { type: 'string', example: '' },
             
            },
        }
       
      },
    },
  },
  // Rutas donde swagger-jsdoc buscará comentarios JSDoc para generar la documentación
  // Asegúrate de que esta ruta sea correcta para tu ProductoController
  apis: [
    './app/Presentation/*.ts', // <-- asegúrate que esta ruta apunta a tus controladores
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;