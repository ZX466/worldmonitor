export const config = { runtime: 'edge' };

import { createDomainGateway, serverOptions } from '../../../server/gateway';
import { tradeHandler } from '../../../server/worldmonitor/trade/v1/handler';
import { createTradeServiceRoutes } from '../../../src/generated/server/worldmonitor/trade/v1/service_server';

export default createDomainGateway(
  createTradeServiceRoutes(tradeHandler, serverOptions),
);
