import type { AWS } from '@serverless/typescript';

export const s3Resources: NonNullable<AWS['resources']>['Resources'] = {
  ImageProcessingInputS3Bucket: {
    Type: 'AWS::S3::Bucket',
    Properties: {
      BucketName: 'isa-documents-image-processing-input-${sls:stage}',
      CorsConfiguration: {
        CorsRules: [
          {
            AllowedHeaders: ['*'],
            AllowedMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE'],
            AllowedOrigins: ['*'],
            ExposeHeaders: ['x-amz-server-side-encryption', 'x-amz-request-id', 'x-amz-id-2', 'ETag', 'x-amz-meta-foo'],
            MaxAgeSeconds: 3000,
          },
        ],
      },
      LifecycleConfiguration: {
        Rules: [
          {
            Status: 'Enabled',
            ExpirationInDays: 30,
          },
        ],
      },
    },
  },
};
