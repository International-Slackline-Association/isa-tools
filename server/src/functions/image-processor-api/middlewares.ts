import { logger } from 'core/utils/logger';
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

export const injectCommonlyUsedHeadersMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  next();
};

export const errorMiddleware: ErrorRequestHandler = async (error, req, res, next) => {
  if (!error) {
    next();
    return;
  }
  const message = error.message || 'Error occurred';
  const stack = error.stack;

  logger.error(message, {
    httpRequest: { path: req.path, body: req.body, method: req.method },
    stack,
  });
  res.status(500).json({
    status: 500,
    message,
    stack,
  });
};

export const notFoundMiddleware = (_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({ message: '404 Not Found' });
};
