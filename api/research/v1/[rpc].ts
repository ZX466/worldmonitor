export const config = { runtime: 'edge' };

import { createDomainGateway, serverOptions } from '../../../server/gateway';
import { researchHandler } from '../../../server/worldmonitor/research/v1/handler';
import { createResearchServiceRoutes } from '../../../src/generated/server/worldmonitor/research/v1/service_server';

export default createDomainGateway(
  createResearchServiceRoutes(researchHandler, serverOptions),
);
