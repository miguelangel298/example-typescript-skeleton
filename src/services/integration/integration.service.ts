import { createService, registerService } from '@singleton-core/express';
import UserMiddlewares from './integration.middlewares';
import IntegrationEntity from './integration.entity';

export default registerService<IntegrationEntity>(() => ({
  name: 'integrations',
  entity: 'integration',
  service: createService<IntegrationEntity>(IntegrationEntity),
  middlewares: UserMiddlewares,
}));