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
            AllowedMethods: ['HEAD', 'GET', 'PUT', 'POST', 'DELETE'],
            AllowedOrigins: ['*'],
            ExposedHeaders: [],
            MaxAge: 3600,
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
