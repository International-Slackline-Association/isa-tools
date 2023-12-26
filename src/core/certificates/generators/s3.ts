import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3 } from 'core/aws/clients';

export const putCertificateToS3 = async (fileName: string, pdf: Buffer) => {
  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.TEMPORARY_UPLOADS_S3_BUCKET,
      Key: `certificates/${fileName}`,
      Body: pdf,
      ContentType: 'application/pdf',
      CacheControl: 'public, no-cache',
    }),
  );

  const command = new GetObjectCommand({
    Bucket: process.env.TEMPORARY_UPLOADS_S3_BUCKET,
    Key: `certificates/${fileName}`,
  });
  const presignedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

  return { presignedUrl };
};
