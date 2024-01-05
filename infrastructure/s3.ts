import type { AWS } from '@serverless/typescript';

export const s3Resources: NonNullable<AWS['resources']>['Resources'] = {
  TemporaryUploadsS3BBucket: {
    Type: 'AWS::S3::Bucket',
    Properties: {
      BucketName: 'isa-documents-uploads-${sls:stage}',
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
};
