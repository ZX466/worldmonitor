export const config = { runtime: 'edge' };

import { createDomainGateway, serverOptions } from '../../../server/gateway';
import { displacementHandler } from '../../../server/worldmonitor/displacement/v1/handler';
import { createDisplacementServiceRoutes } from '../../../src/generated/server/worldmonitor/displacement/v1/service_server';

export default createDomainGateway(
  createDisplacementServiceRoutes(displacementHandler, serverOptions),
);
