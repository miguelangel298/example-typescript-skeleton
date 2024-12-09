import { IMiddlewaresSchema } from '@singleton-core/express';

const middlewares: IMiddlewaresSchema = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    delete: [],
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    delete: [],
  },
};

export default middlewares;
