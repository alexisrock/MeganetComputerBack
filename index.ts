// src/app.module.ts
import 'reflect-metadata';
import express from 'express';
import swaggerUi from "swagger-ui-express";
import { container } from "./app/Config/inversify.config";
import { InversifyExpressServer } from 'inversify-express-utils';
import swaggerSpec from './app/Config/swagger.config';
import { errorHandler } from './app/Presentation/Middleware/error.middleware';

const main = async () => {


  const app = express(); 
  app.use(express.json());
  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  let server =  new InversifyExpressServer(container, null, { rootPath: "/api" }, app);
  
  let appConfigured = server.build();
  appConfigured.use(errorHandler); 
  appConfigured.listen(3000, () => `App running on 3000`);


}

main().catch(err => {
  console.error(err);
});
