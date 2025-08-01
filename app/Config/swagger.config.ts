// src/config/swagger.config.ts

import swaggerJSDoc from 'swagger-jsdoc';
import { Options } from 'swagger-jsdoc';

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Meganet',
      version: '1.0.0',
      description: 'Documentación de la API para la gestión de usuarios y categorías de Meganet.',
    },
    components: {
      schemas: {
        AuthenticatorRequest: {
          type: 'object',
          required: ['email', 'pass'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'usuario@ejemplo.com',
              description: 'Correo electrónico del usuario para la autenticación.',
            },
            pass: {
              type: 'string',
              format: 'password',
              example: 'MiContrasenaSegura123',
              description: 'Contraseña del usuario para la autenticación.',
            },
          },
        },
        TokenResponse: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
              description: 'Token JWT generado tras una autenticación exitosa.',
            },
          },
        },ClienteRequest: {
          type: 'object',
          properties: {           
            cedulaCli: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
              description: '',
            },
            nombrecli: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
              description: '',
            },
            apellidosCli: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
              description: '',
            },
            direccionCli: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
              description: '',
            },
            telefonoCli: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
              description: '',
            },
            emailCli: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
              description: '',
            },
            pass: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
              description: '',
            },
          },
        },
        ClienteResponse: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
              description: '',
            },
            cedula: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
              description: '',
            },
            nombre: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
              description: '',
            },
            apellidos: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
              description: '',
            },
            direccion: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
              description: '',
            },
            telefono: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
              description: '',
            },
            email: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
              description: '',
            },
          },
        },
        CategoryRequest: {
          type: 'object',
          required: ['name'],
          properties: {
            name: {
              type: 'string',
              example: 'Electrónica',
              description: 'Nombre de la nueva categoría a crear.',
            },
          },
        },
        CategoryUpdateRequest: {
          type: 'object',
          required: ['id', 'name'],
          properties: {
            id: {
              type: 'string',
              example: '60c72b2f9b1d8e001f8e4e9f',
              description: 'ID de la categoría a actualizar.',
            },
            name: {
              type: 'string',
              example: 'Artículos del hogar',
              description: 'Nuevo nombre de la categoría.',
            },
          },
        },
        CategoryResponse: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '60c72b2f9b1d8e001f8e4e9f',
              description: 'ID único de la categoría.',
            },
            name: {
              type: 'string',
              example: 'Electrónica',
              description: 'Nombre de la categoría.',
            },
          },
        },
      },
    },
  },

  apis: [   
    './app/Presentation/*.ts',      
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
