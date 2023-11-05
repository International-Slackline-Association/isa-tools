import express, { Request, Response } from 'express';
import { catchExpressJsErrorWrapper, validateApiPayload } from './utils';
import { ProcessImagePostBody, processImageSchema } from './schema';
import { s3 } from 'core/aws/clients';
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';

export const processImage = async (req: Request<any, any, ProcessImagePostBody>, res: Response) => {
  const body = req.body;

  validateApiPayload(body, processImageSchema);

  const s3Image = await s3.send(
    new GetObjectCommand({
      Bucket: body.input.s3?.bucket,
      Key: body.input.s3?.key,
    }),
  );
  const streamToString = await s3Image.Body!.transformToString('base64');
  const originalImageBody = Buffer.from(streamToString, 'base64');
  const originalImageSize = s3Image.ContentLength;

  const sharpObject = sharp(originalImageBody);

  const processedImage = sharpObject.resize({
    width: body.width,
    height: body.height,
    fit: body.fit,
    withoutEnlargement: true,
  });

  const imageBuffer = await processedImage.toBuffer();
  const newImageSize = Buffer.byteLength(imageBuffer, 'base64');

  console.log('originalImageSize', originalImageSize);
  console.log('newImageSize', newImageSize);

  await s3.send(
    new PutObjectCommand({
      Bucket: body.output.s3?.bucket,
      Key: body.output.s3?.key,
      Body: imageBuffer,
      ContentType: 'image/jpeg',
      ContentEncoding: 'base64',
    }),
  );
  res.status(200).json({ message: 'ok' });
  // res.writeHead(200, {
  //   'content-type': 'image/jpeg',
  //   'content-encoding': 'base64',
  //   'content-length': newImageSize,
  // });
  // res.end(imageBuffer);
};
export const api = express.Router();
api.post('/', catchExpressJsErrorWrapper(processImage));
