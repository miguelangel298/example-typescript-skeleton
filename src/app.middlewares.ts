import { IMiddlewaresSchema } from "@singleton-core/express";
import { sendResponse } from "@singleton-core/express";


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
    all: [sendResponse()],
    find: [],
    get: [],
    create: [],
    update: [],
    delete: [],
  },
};

export default middlewares;
