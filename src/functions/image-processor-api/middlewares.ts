import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { logger } from 'core/utils/logger';
import { parseExpectedError } from 'core/utils/error';

export const injectCommonlyUsedHeadersMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  next();
};

export const errorMiddleware: ErrorRequestHandler = async (error, req, res, next) => {
  if (!error) {
    next();
    return;
  }
  const { status, code, errorMessage, isExpectedError } = parseExpectedError(error);
  const message = errorMessage || 'Error occurred';
  const stack = error.stack;

  const loggerData = {
    httpRequest: { path: req.path, body: req.body, method: req.method, query: req.query, user: req.user },
    status,
    stack,
  };
  if (isExpectedError) {
    logger.warn(message, loggerData);
  } else {
    logger.error(message, loggerData);
  }

  res.status(status).json({
    status: 500,
    message,
    code,
    stack,
  });
};

export const notFoundMiddleware = (_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({ message: '404 Not Found' });
};
