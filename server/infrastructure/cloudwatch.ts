import type { AWS } from '@serverless/typescript';

export const cloudwatchResources: NonNullable<AWS['resources']>['Resources'] = {
  ApplicationLogsGroup: {
    Type: 'AWS::Logs::LogGroup',
    Properties: {
      LogGroupName: 'isa-tools/applicationLogs-${sls:stage}',
      RetentionInDays: 90,
    },
  },
};
