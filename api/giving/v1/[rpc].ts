export const config = { runtime: 'edge' };

import { createDomainGateway, serverOptions } from '../../../server/gateway';
import { givingHandler } from '../../../server/worldmonitor/giving/v1/handler';
import { createGivingServiceRoutes } from '../../../src/generated/server/worldmonitor/giving/v1/service_server';

export default createDomainGateway(
  createGivingServiceRoutes(givingHandler, serverOptions),
);
