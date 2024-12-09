import { NextFunction, Request, Response } from 'express';
import { get, isArray, set } from 'lodash';

/**
 * This middleware check a object relation with a condition add key canDelete : bolean
 */
const checkCanDeleteMiddleware = <T extends {}>(condition: (data: T)=>boolean,relation?: string) =>
  async (_req: Request | any, res: Response, next: NextFunction) => {
    const data = get(res,'result.data');
    if (data && !isArray(data)) {
      const dataFromRelation = get(data, relation, data);
      if (dataFromRelation){
        set(data,'canDelete', condition(dataFromRelation));
      }else {

        set(data,'canDelete', true);
      }
    } else if(isArray(data)) {
      data.map(item=>{
        const dataFromRelation = get(item, relation, item);

        if (dataFromRelation){
          set(item,'canDelete', condition(dataFromRelation));
        }else {
          set(item,'canDelete', true);
        }
        return item;
      });

    }
    next();
  };
export default checkCanDeleteMiddleware;
