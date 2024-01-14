import type { AWS } from '@serverless/typescript';

export const snsResources: NonNullable<AWS['resources']>['Resources'] = {
  NotificationsTopic: {
    Type: 'AWS::SNS::Topic',
    Properties: {
      TopicName: 'isa-tools-notifications-${sls:stage}',
      DisplayName: 'ISA Tools Notifications',
      Subscription: [
        {
          Endpoint: 'can@slacklineinternational.org',
          Protocol: 'email',
        },
      ],
    },
  },
  NotificationsTopicPolicy: {
    Type: 'AWS::SNS::TopicPolicy',
    Properties: {
      PolicyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: {
              Service: 'ses.amazonaws.com',
            },
            Action: 'sns:Publish',
            Resource: {
              Ref: 'NotificationsTopic',
            },
            Condition: {
              ArnLike: {
                'aws:SourceArn':
                  'arn:aws:ses:${aws:region}:${aws:accountId}:identity/slacklineinternational.org*',
              },
            },
          },
        ],
      },
      Topics: [
        {
          Ref: 'NotificationsTopic',
        },
      ],
    },
  },
};
