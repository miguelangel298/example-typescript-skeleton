import * as compression from 'compression';
import * as express from 'express';
import * as BodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import appMiddlewares from './app.middlewares';
import MassiveImport from './utils/MassiveImport';
import { Gateway } from './gateway/Gateway';
import * as cors from 'cors';
import List from './handlers/HandlersList';
import { IAppProvider, IApplicationService } from '@singleton-core/express';

export async function buildApp(config: any) {
// Connection Database
  await createConnection(config.database);

  // Create App
  const app = (express() as any) as IAppProvider;

  Object.keys(config).forEach(key => {
    app.set(key, config[key]);
  });

  app.registeredServices = {};
  app.useService = (name: string, service: IApplicationService<any>) => {
    app.registeredServices[name] = service;
  };
  app.service = (name: string) => app.registeredServices[name];

  // Register gateways
  Gateway.url = app.get('gateway').url;
  app.set('gateway', Gateway);

  // App Middlewares
  app.use(compression());
  app.use(BodyParser.urlencoded({ extended: false, limit: '50mb'  }));
  app.use(BodyParser.json({ limit: '50mb' }));
  app.use(cors({ origin: '*' }));

  app.set('appMiddlewares', appMiddlewares);

  // set the service dir for searching all services into services directory
  const servicesDir = `${__dirname}/services/**/*.service{.ts,.js}`;

  // get all services importing them with masiveImportUtilsTest function
  const services = MassiveImport.getInstance(servicesDir);
  if (services && services.length) {
    // register all services
    services.forEach(service => service.register(app));
  }

  for (const element of List){
    // tslint:disable-next-line:max-line-length
    app[element.method || 'post'](element.route, ...element.before.map(a=>a(app)),element.handler(app));
  }

  return app;

}
