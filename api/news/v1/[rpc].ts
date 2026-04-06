export const config = { runtime: 'edge' };

import { createDomainGateway, serverOptions } from '../../../server/gateway';
import { newsHandler } from '../../../server/worldmonitor/news/v1/handler';
import { createNewsServiceRoutes } from '../../../src/generated/server/worldmonitor/news/v1/service_server';

export default createDomainGateway(
  createNewsServiceRoutes(newsHandler, serverOptions),
);
