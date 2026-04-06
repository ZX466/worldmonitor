export const config = { runtime: 'edge' };

import { createDomainGateway, serverOptions } from '../../../server/gateway';
import { militaryHandler } from '../../../server/worldmonitor/military/v1/handler';
import { createMilitaryServiceRoutes } from '../../../src/generated/server/worldmonitor/military/v1/service_server';

export default createDomainGateway(
  createMilitaryServiceRoutes(militaryHandler, serverOptions),
);
