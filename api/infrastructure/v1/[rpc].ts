export const config = { runtime: 'edge' };

import { createDomainGateway, serverOptions } from '../../../server/gateway';
import { infrastructureHandler } from '../../../server/worldmonitor/infrastructure/v1/handler';
import { createInfrastructureServiceRoutes } from '../../../src/generated/server/worldmonitor/infrastructure/v1/service_server';

export default createDomainGateway(
  createInfrastructureServiceRoutes(infrastructureHandler, serverOptions),
);
