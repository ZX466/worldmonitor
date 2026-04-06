export const config = { runtime: 'edge' };

import { createDomainGateway, serverOptions } from '../../../server/gateway';
import { predictionHandler } from '../../../server/worldmonitor/prediction/v1/handler';
import { createPredictionServiceRoutes } from '../../../src/generated/server/worldmonitor/prediction/v1/service_server';

export default createDomainGateway(
  createPredictionServiceRoutes(predictionHandler, serverOptions),
);
