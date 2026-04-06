export const config = { runtime: 'edge' };

import { createDomainGateway, serverOptions } from '../../../server/gateway';
import { conflictHandler } from '../../../server/worldmonitor/conflict/v1/handler';
import { createConflictServiceRoutes } from '../../../src/generated/server/worldmonitor/conflict/v1/service_server';

export default createDomainGateway(
  createConflictServiceRoutes(conflictHandler, serverOptions),
);
