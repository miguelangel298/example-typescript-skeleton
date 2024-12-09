import { NextFunction, Request, Response } from 'express';
import { merge, pick } from 'lodash';
/**
 * This middleware add to body fields of audit
 */
export const addAuditMiddleware = (
  fields?: ('updatedAt' |'createdAt' | 'createdBy'|'updatedBy')[]) =>
  async (req: Request | any, _res: Response, next: NextFunction) => {
    const toPost = {
      updatedAt: new Date(),
      createdAt: new Date(),
      createdBy: req.auth.user.id,
      updatedBy: req.auth.user.id,
    };
    const toPut = {
      updatedAt: new Date(),
      updatedBy: req.auth.user.id,
    };

    switch (req.method) {
      case 'POST':
        try {
          for (let value of req.body) {
            value = merge(value, (fields ? pick(toPost, fields) : toPost));
          }
        }catch (e) {
          req.body = merge(req.body,  (fields ? pick(toPost, fields) : toPost));
        }
        break;
      case 'PUT':
        try {
          for (let value of req.body) {
            value = merge(value, (fields ? pick(toPut, fields) : toPut));
          }
        }catch (e) {
          req.body = merge(req.body,  (fields ? pick(toPut, fields) : toPut));
        }
        break;
    }
    next();
  };
