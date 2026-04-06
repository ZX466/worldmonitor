export const config = { runtime: 'edge' };

import { createDomainGateway, serverOptions } from '../../../server/gateway';
import { seismologyHandler } from '../../../server/worldmonitor/seismology/v1/handler';
import { createSeismologyServiceRoutes } from '../../../src/generated/server/worldmonitor/seismology/v1/service_server';

export default createDomainGateway(
  createSeismologyServiceRoutes(seismologyHandler, serverOptions),
);
