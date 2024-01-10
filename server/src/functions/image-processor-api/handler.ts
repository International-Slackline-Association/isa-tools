import serverlessExpress from '@vendia/serverless-express';
import { logger } from 'core/utils/logger';

import app from './app';

logger.updateMeta({ lambdaName: 'image-processor-api' });
export const main = serverlessExpress({
  app,
});
