import serverlessExpress from '@vendia/serverless-express';
import app from './app';
import { logger } from 'core/utils/logger';

logger.updateMeta({ lambdaName: 'api' });

export const main = serverlessExpress({
  app,
});
