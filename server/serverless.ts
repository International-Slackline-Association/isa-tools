import api from '@functions/api/lambda';
import certificateTester from '@functions/certificateTester/lambda';
import imageProcessorApi from '@functions/image-processor-api/lambda';
import logger from '@functions/logger/lambda';
import type { AWS } from '@serverless/typescript';
import { backupResources } from 'infrastructure/backup';
import { cloudwatchResources } from 'infrastructure/cloudwatch';
import { dynamodbResources } from 'infrastructure/dynamodb';
import { s3Resources } from 'infrastructure/s3';

const serverlessConfiguration: AWS = {
  service: 'isa-documents',
  frameworkVersion: '3',
  plugins: ['serverless-plugin-log-subscription', 'serverless-esbuild', 'serverless-prune-plugin'],
  provider: {
    name: 'aws',
    runtime: 'nodejs20.x',
    region: 'eu-central-1',
    profile: '${env:AWS_PROFILE}',
    stage: 'prod',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
      binaryMediaTypes: ['image/jpeg', 'image/png', 'image/webp'],
      apiKeys: [
        {
          name: 'TrustedServiceApiKey',
          description: 'API key for trusted services',
          enabled: true,
        },
      ],
    },

    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      APPLICATION_LOG_GROUP_NAME: { Ref: 'ApplicationLogsGroup' },
      TEMPORARY_UPLOADS_S3_BUCKET: { Ref: 'TemporaryUploadsS3BBucket' },
      ISA_DOCUMENTS_TRUSTED_SERVICE_API_KEY: '${ssm:/isa-documents-trusted-service-api-key}',
      ISA_DOCUMENTS_TABLE_NAME: { Ref: 'IsaDocumentsTable' },
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
            Action: ['dynamodb:*'],
            Resource: [
              {
                'Fn::Join': ['', [{ 'Fn::GetAtt': ['IsaDocumentsTable', 'Arn'] }, '*']],
              },
            ],
          },
          {
            Effect: 'Allow',
            Action: ['s3:GetObject', 's3:PutObject'],
            Resource: [
              {
                'Fn::Join': ['', [{ 'Fn::GetAtt': ['TemporaryUploadsS3BBucket', 'Arn'] }, '*']],
              },
            ],
          },

          {
            Effect: 'Allow',
            Action: ['ssm:GetParameters', 'ssm:GetParameter', 'ssm:GetParametersByPath'],
            Resource: ['arn:aws:ssm:${aws:region}:${aws:accountId}:parameter/isa-documents*'],
          },
          {
            Effect: 'Allow',
            Action: ['s3:PutObject'],
            Resource: ['${cf:slackmap-prod.SlackMapImagesS3BucketArn}/public/*'],
          },
          {
            Effect: 'Allow',
            Action: ['s3:PutObject'],
            Resource: ['${cf:isa-users-prod.ISAUsersImagesS3BucketArn}/public/*'],
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
  functions: { api, imageProcessorApi, logger, certificateTester },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk', 'sharp'],
      target: 'node20',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
      loader: {
        '.pdf': 'dataurl',
        '.ttf': 'dataurl',
      },
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
      ...s3Resources,
      ...backupResources,
      ...dynamodbResources,
    },
  },
};

module.exports = serverlessConfiguration;
