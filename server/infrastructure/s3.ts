import type { AWS } from '@serverless/typescript';

export const s3Resources: NonNullable<AWS['resources']>['Resources'] = {
  TemporaryUploadsS3BBucket: {
    Type: 'AWS::S3::Bucket',
    Properties: {
      BucketName: 'isa-tools-temporary-uploads-${sls:stage}',
      CorsConfiguration: {
        CorsRules: [
          {
            AllowedHeaders: ['*'],
            AllowedMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE'],
            AllowedOrigins: ['*'],
            ExposedHeaders: [
              'x-amz-server-side-encryption',
              'x-amz-request-id',
              'x-amz-id-2',
              'ETag',
              'x-amz-meta-foo',
            ],
            MaxAge: 3000,
          },
        ],
      },
      LifecycleConfiguration: {
        Rules: [
          {
            Status: 'Enabled',
            ExpirationInDays: 90,
          },
        ],
      },
    },
  },
  WebAppS3Bucket: {
    Type: 'AWS::S3::Bucket',
    Properties: {
      BucketName: 'isa-tools-ui-${sls:stage}',
    },
  },
  WebAppS3BucketPolicy: {
    Type: 'AWS::S3::BucketPolicy',
    Properties: {
      Bucket: {
        Ref: 'WebAppS3Bucket',
      },
      PolicyDocument: {
        Version: '2008-10-17',
        Id: 'PolicyForCloudFrontPrivateContent',
        Statement: [
          {
            Sid: 'AllowCloudFrontServicePrincipal',
            Effect: 'Allow',
            Principal: {
              Service: 'cloudfront.amazonaws.com',
            },
            Action: 's3:GetObject',
            Resource: 'arn:aws:s3:::isa-tools-ui-prod/*',
            Condition: {
              StringEquals: {
                'AWS:SourceArn': 'arn:aws:cloudfront::387132903656:distribution/E22IDS9URBBBCU',
              },
            },
          },
        ],
      },
    },
  },
};
