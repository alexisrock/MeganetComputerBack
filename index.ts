// src/app.module.ts
import 'reflect-metadata';
import express from 'express';
import swaggerUi from "swagger-ui-express";
import { container } from "./inversify.config";
import { InversifyExpressServer } from 'inversify-express-utils';
import swaggerSpec from './app/docs/swagger.config';

const main = async () => {


  const app = express(); 
  app.use(express.json());
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  let server =  new InversifyExpressServer(container, null, { rootPath: "/api" }, app);
  let appConfigured = server.build();
  appConfigured.listen(3000, () => `App running on 3000`);


}

main().catch(err => {
  console.error(err);
});
