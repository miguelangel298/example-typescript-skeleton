import { Request, Response, NextFunction } from 'express';
import MassiveImport from './MassiveImport';
import { get, set } from 'lodash';
import { IAppProvider } from "@singleton-core/express";
/**
 * This middleware add automatically entity in the consult if service is registered
 * @param app
 */
export const manageQueryMiddleware = (app: IAppProvider) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    if (get(req.query, 'where')) {

      for (const param in req.query.where) {
        if (app.service(param)) {
          const instance = MassiveImport.getInstance(`${__dirname}/../../**/${param}.entity{.ts,.js}`).shift();
          if (instance) {
            const entity = new instance();
            set(entity, 'id', get(req.query.where, param));
            set(req.query.where, param, entity);
          }
        }
      }
    } else if (get(req, 'query')) {
      for (const param in req.query) {
        if (app.service(param)) {
          const instance = MassiveImport.getInstance(`${__dirname}/../../**/${param}.entity{.ts,.js}`).shift();
          if (instance) {
            const entity = new instance();
            set(entity, 'id', get(req.query, param));
            set(req.query, param, entity);
          }
        }
      }
    }
    next();
  };
