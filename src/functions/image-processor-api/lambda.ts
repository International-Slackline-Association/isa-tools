import type { AWS } from '@serverless/typescript';
import { handlerPath } from 'core/utils/lambda';

const lambda: NonNullable<AWS['functions']>[0] = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'any',
        path: '/image-processor/{proxy+}',
        cors: true,
        private: true,
      },
    },
  ],
  timeout: 30,
  logRetentionInDays: 90,
  layers: [
    {
      Ref: 'SharpLambdaLayer',
    },
  ],
};

export default lambda;
