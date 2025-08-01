import { Request, Response } from "express";
import { HttpError } from "./http-error.class"; // Opcional: Para errores personalizados

/**
 * Middleware para el manejo centralizado de errores.
 * Captura errores, los registra y envía una respuesta estandarizada al cliente.
 */
export const errorHandler = (
  err: Error | HttpError, // El error puede ser de tipo Error o un error HTTP personalizado
  req: Request,
  res: Response// Aunque no se use, es necesario para que Express lo reconozca como middleware de error
) => {
  console.error(
    `[ERROR] - ${new Date().toISOString()} - ${req.method} ${req.originalUrl}`
  );
  console.error(err);

  let statusCode = 500;
  let message = "Ocurrió un error interno en el servidor.";

  if (err instanceof HttpError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message: message,
 
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
