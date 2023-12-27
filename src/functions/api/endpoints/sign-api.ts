import express, { Request, Response } from 'express';
import { catchExpressJsErrorWrapper, validateApiPayload, verifyTrustedServiceRequest } from '../utils';
import { certificateSpreadsheet } from 'core/certificates/spreadsheet';
import {
  GenerateCertificatePostBody,
  ListCertificatesQueryParams,
  SignDocumentePostBody,
  generateCertificatePostBodySchema,
  listCertificatesQueryParamsSchema,
  signDocumentPostBodySchema,
} from './schema';
import { generateCertificatePDF } from 'core/certificates/generators/certificateGenerator';
import { CertificateType } from 'core/certificates/types';
import { uploadPDFToS3 } from 'core/aws/s3';
import { createSignedDocument } from 'core/documentVerification';

const listCertificates = async (req: Request<any, any, any, ListCertificatesQueryParams>, res: Response) => {
  verifyTrustedServiceRequest(req);

  const query = validateApiPayload(req.query, listCertificatesQueryParamsSchema);

  const certs = await certificateSpreadsheet.getAllItems({
    isaId: query.userId,
    email: query.email,
  });

  res.json({ items: certs });
};

const sign = async (req: Request<any, any, SignDocumentePostBody>, res: Response) => {
  verifyTrustedServiceRequest(req);

  const body = validateApiPayload(req.body, signDocumentPostBodySchema);

  const { hash, token, verificationUrl, expiresAt } = await createSignedDocument({
    subject: body.subject,
    expiresInSeconds: body.expiresInSeconds,
    createHash: body.createHash,
    content: body.content,
  });

  res.json({
    hash,
    token,
    verificationUrl,
    expiresAt,
  });
};

export const signApi = express.Router();
signApi.post('/', catchExpressJsErrorWrapper(sign));
