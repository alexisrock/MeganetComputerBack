
export class HttpError extends Error {
    statusCode: number;
  
    constructor(message: string, statusCode: number) {
      super(message);
      this.name = 'HttpError'; // Nombre del error personalizado
      this.statusCode = statusCode;
      Object.setPrototypeOf(this, HttpError.prototype); // Asegura que 'instanceof' funcione correctamente
    }
  }
  
  // Ejemplos de errores específicos basados en HttpError
  export class NotFoundError extends HttpError {
    constructor(message = 'Recurso no encontrado.') {
      super(message, 404);
    }
  }
  
  export class BadRequestError extends HttpError {
    constructor(message = 'La solicitud es inválida.') {
      super(message, 400);
    }
  }
  
  export class UnauthorizedError extends HttpError {
    constructor(message = 'No autorizado.') {
      super(message, 401);
    }
  }
  
  export class ForbiddenError extends HttpError {
    constructor(message = 'Acceso denegado.') {
      super(message, 403);
    }
  }