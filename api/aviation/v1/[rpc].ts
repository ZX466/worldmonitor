export const config = { runtime: 'edge' };

import { createDomainGateway, serverOptions } from '../../../server/gateway';
import { aviationHandler } from '../../../server/worldmonitor/aviation/v1/handler';
import { createAviationServiceRoutes } from '../../../src/generated/server/worldmonitor/aviation/v1/service_server';

export default createDomainGateway(
  createAviationServiceRoutes(aviationHandler, serverOptions),
);
