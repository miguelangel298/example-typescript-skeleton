import { NextFunction, Request, Response } from 'express';
import { merge } from 'lodash';
/**
 * This middleware add to body fields by default
 */
export const addBodyMiddleware = () =>
  async (req: Request, _res: Response, next: NextFunction) => {
    const toAdd = {
      updatedAt: new Date(),
    };
    try {
      for (let value of req.body) {
        value = merge(value, toAdd);
      }
    }catch (e) {
      req.body = merge(req.body, toAdd);
    }

    next();
  };
