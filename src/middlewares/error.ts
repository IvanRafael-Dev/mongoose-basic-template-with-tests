import { ZodError } from 'zod';
import { ErrorRequestHandler } from 'express';
import { errorCatalog, ErrorTypes } from '../erros/catalog';

const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({ message: err.issues });
  }

  const errorType = err.message as keyof typeof ErrorTypes;

  const mappedError = errorCatalog[errorType];
  if (mappedError) {
    const { message, statusCode } = mappedError;
    return res.status(statusCode).json({ message });
  }
};

export default errorHandler;