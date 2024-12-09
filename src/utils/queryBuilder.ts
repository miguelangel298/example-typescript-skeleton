import { compact } from 'lodash';
import { getConnection } from 'typeorm';
/**
 * This function build query with data and sp
 * @param sp
 * @param data
 */
export const queryBuilder = (sp: string, data:any[]) => {
  const parameters: any[] = [];
  const fields = Object.keys(data).map(i => {

    let val = data[i];
    // Remove '/' from value
    if (`${data[i]}`.search('/') >= 0) {
      val = data[i].replace(/(\/)+/g, '');
    }

    // Dont add url parameters field if is undefined
    if (i === '0' && !data[i]) {
      return undefined;
      // Add url parameters if is available and valid
    } if (i === '0' && data[i]) {
      // Add to array scalable parameters
      parameters.push(val);
      return  `@${i}`;
    }
    // Add parameters with value null
    if (val === null) {
      return `@${i} = null`;
    }
    // Add parameters coming in 'body' and 'query' if is available
    return  (!data[i] && i === '0') ? `@${i}`  :  `@${i} = '${val}'`;

  });
  return {query: `Exec ${sp} ${compact(fields)}`,
    params: parameters};
  // Call store procedure configured
};

export const handlerSp = async (req: any, sp: any) => {

  let builder: any = {};
  // We identify the method to make the call
  switch (req.method) {
    case 'GET':
      if (!req.params[0]) {
        builder = queryBuilder(sp, [req.params.id]);
      }
      builder = queryBuilder(sp,  [req.params.id]);
      break;
    case 'POST':
      builder = queryBuilder(sp,   [req.body[0].admission]);
      break;
    case 'PUT':
      builder = queryBuilder(sp,  [req.params.id]);
      break;
  }

  return await getConnection()
    .query(builder.query, builder.params);

};
