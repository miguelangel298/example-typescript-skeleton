import { Request, Response, NextFunction } from 'express';
import { set, get } from 'lodash';

export default interface ParamsToPaginate {
  sort?: 'ASC' | 'DESC';
  field?: string ;
  search?: string;
  page?: number;
  perPage?: number;
  offset?: number;
  usePagination ?: boolean;

}
/**
 * This middleware add automatically pagination to request
 */
export const paginationMiddleware = () =>
  async (req: Request | any, _res: Response, next: NextFunction) => {

    if (get(req.query, 'where')) {
      const configToPaginate = getConfigToPaginate({ ...req.query.where });
      set(req, 'pagination', configToPaginate);

      if (!req.query.where.pagination) {
        req['pagination'].field &&
        set(req.query, 'order', {
          [req['pagination'].field] : req['pagination'].sort});
        set(req.query, 'skip', req['pagination'].offset);
        set(req.query, 'take', req['pagination'].perPage);
      }

    } else {
      const configToPaginate = getConfigToPaginate({ ...req.query });
      set(req, 'pagination', configToPaginate);
      if (!req.query.pagination) {
        set(req, 'query', {
          where: req.query,
          order: { [req['pagination'].field]: req['pagination'].sort },
          skip: req['pagination'].offset,
          take: req['pagination'].perPage,
        });
      }
    }
    next();
  };

export function getConfigToPaginate(params : Partial <ParamsToPaginate>): ParamsToPaginate {
  const result: any = {};
  result.field = params.field || 'id';

  if (params.search !== undefined) {
    result.search = params.search.toLowerCase();
    result.search = params.search.replace(/\s/g, '');
  }

  result.sort = params.sort && params.sort.indexOf('desc') ? 'DESC' : 'ASC';
  result.page = params.page || 1;
  result.perPage = params.perPage || 10;

  if (params.usePagination === false) {
    result.perPage = 0;
  }

  result.offset = ((result.page * result.perPage) - result.perPage) || 0;

  return result;
}
