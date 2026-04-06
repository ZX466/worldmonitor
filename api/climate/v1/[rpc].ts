export const config = { runtime: 'edge' };

import { createDomainGateway, serverOptions } from '../../../server/gateway';
import { climateHandler } from '../../../server/worldmonitor/climate/v1/handler';
import { createClimateServiceRoutes } from '../../../src/generated/server/worldmonitor/climate/v1/service_server';

export default createDomainGateway(
  createClimateServiceRoutes(climateHandler, serverOptions),
);
