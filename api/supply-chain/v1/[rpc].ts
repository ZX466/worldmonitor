export const config = { runtime: 'edge' };

import { createDomainGateway, serverOptions } from '../../../server/gateway';
import { supplyChainHandler } from '../../../server/worldmonitor/supply-chain/v1/handler';
import { createSupplyChainServiceRoutes } from '../../../src/generated/server/worldmonitor/supply_chain/v1/service_server';

export default createDomainGateway(
  createSupplyChainServiceRoutes(supplyChainHandler, serverOptions),
);
