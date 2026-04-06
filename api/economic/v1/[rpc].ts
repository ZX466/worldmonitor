export const config = { runtime: 'edge' };

import { createDomainGateway, serverOptions } from '../../../server/gateway';
import { economicHandler } from '../../../server/worldmonitor/economic/v1/handler';
import { createEconomicServiceRoutes } from '../../../src/generated/server/worldmonitor/economic/v1/service_server';

export default createDomainGateway(
  createEconomicServiceRoutes(economicHandler, serverOptions),
);
