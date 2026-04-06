export const config = { runtime: 'edge' };

import { createDomainGateway, serverOptions } from '../../../server/gateway';
import { marketHandler } from '../../../server/worldmonitor/market/v1/handler';
import { createMarketServiceRoutes } from '../../../src/generated/server/worldmonitor/market/v1/service_server';

export default createDomainGateway(
  createMarketServiceRoutes(marketHandler, serverOptions),
);
