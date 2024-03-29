import { Request, Response } from 'express';
import { ZodError, ZodTypeAny, z } from 'zod';

export const catchExpressJsErrorWrapper = (
  f: (req: Request<any, any, any, any>, res: Response, next?: any) => Promise<any>,
) => {
  return (req: Request, res: Response, next: any) => {
    f(req, res, next).catch(next);
  };
};

export const validateApiPayload = <T extends ZodTypeAny>(
  payload: unknown,
  schema: T,
): z.infer<T> => {
  try {
    return schema.parse(payload);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error(`Validation: ${error.issues[0].path?.[0]}: ${error.issues[0].message}.`);
    }
    throw error;
  }
};
