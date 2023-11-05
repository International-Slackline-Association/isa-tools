import type { AWS } from '@serverless/typescript';

import imageProcessorApi from '@functions/image-processor-api/lambda';
import logger from '@functions/logger/lambda';

import { cloudwatchResources } from 'infrastructure/cloudwatch';

const serverlessConfiguration: AWS = {
  service: 'isa-documents',
  frameworkVersion: '3',
  plugins: ['serverless-plugin-log-subscription', 'serverless-esbuild', 'serverless-prune-plugin'],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    region: 'eu-central-1',
    profile: '${env:AWS_PROFILE}',
    stage: 'prod',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
      binaryMediaTypes: ['*/*', 'image/*', 'image/jpeg', 'image/png', 'image/webp'],
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      APPLICATION_LOG_GROUP_NAME: { Ref: 'ApplicationLogsGroup' },
    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: ['logs:*'],
            Resource: [
              {
                'Fn::GetAtt': ['ApplicationLogsGroup', 'Arn'],
              },
            ],
          },
          {
            Effect: 'Allow',
            Action: ['s3:GetObject', 's3:PutObject'],
            Resource: ['arn:aws:s3:::isa-image-processing-buffer/*'],
          },
        ],
      },
    },
  },
  layers: {
    sharp: {
      path: 'lambdaLayers/SharpLayer',
      name: '${self:service}-${self:provider.stage}-sharp',
      package: {
        include: ['node_modules/**'],
      },
      description: 'sharp@0.32.6',
      retain: false,
      compatibleRuntimes: ['nodejs16.x', 'nodejs18.x'],
    },
  },
  // import the function via paths
  functions: { imageProcessorApi, logger },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk', 'sharp'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    prune: {
      automatic: true,
      number: 5,
    },
    logSubscription: {
      enabled: true,
      filterPattern: '{ $.level = "*" && $.message = "*" }',
      destinationArn: {
        'Fn::GetAtt': ['LoggerLambdaFunction', 'Arn'],
      },
    },
  },
  resources: {
    Resources: {
      ...cloudwatchResources,
    },
  },
};

module.exports = serverlessConfiguration;
