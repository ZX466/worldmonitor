export const config = { runtime: 'edge' };

import { createDomainGateway, serverOptions } from '../../../server/gateway';
import { maritimeHandler } from '../../../server/worldmonitor/maritime/v1/handler';
import { createMaritimeServiceRoutes } from '../../../src/generated/server/worldmonitor/maritime/v1/service_server';

export default createDomainGateway(
  createMaritimeServiceRoutes(maritimeHandler, serverOptions),
);
