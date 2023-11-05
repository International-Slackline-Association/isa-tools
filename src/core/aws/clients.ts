import { CloudWatchLogsClient } from '@aws-sdk/client-cloudwatch-logs';
import { S3Client } from '@aws-sdk/client-s3';

export const cwLogs = new CloudWatchLogsClient();
export const s3 = new S3Client();
