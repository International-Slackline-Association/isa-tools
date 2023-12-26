import express, { Request, Response } from 'express';
import { catchExpressJsErrorWrapper, validateApiPayload, verifyTrustedServiceRequest } from '../utils';
import { certificateSpreadsheet } from 'core/certificates/spreadsheet';
import { createVerifiableDocument } from 'core/documentVerification';
import {
  GenerateCertificatePostBody,
  ListCertificatesQueryParams,
  generateCertificatePostBodySchema,
  listCertificatesQueryParamsSchema,
} from './schema';
import { certificateGenerator } from 'core/certificates/generators/certificateGenerator';
import { CertificateType } from 'core/certificates/types';

const listCertificates = async (req: Request<any, any, any, ListCertificatesQueryParams>, res: Response) => {
  verifyTrustedServiceRequest(req);

  const query = validateApiPayload(req.query, listCertificatesQueryParamsSchema);

  const certs = await certificateSpreadsheet.getAllItems({
    isaId: query.userId,
    email: query.email,
  });

  res.json({ items: certs });
};

const generateCertificate = async (req: Request<any, any, GenerateCertificatePostBody>, res: Response) => {
  verifyTrustedServiceRequest(req);

  const body = validateApiPayload(req.body, generateCertificatePostBodySchema);

  const { presignedUrl } = await certificateGenerator.generate({
    certificateType: body.certificateType as CertificateType,
    certificateId: body.certificateId,
    subject: body.subject,
    language: body.language,
  });

  res.json({ downloadUrl: presignedUrl });
};

export const certificateApi = express.Router();
certificateApi.get('/', catchExpressJsErrorWrapper(listCertificates));
certificateApi.post('/generate', catchExpressJsErrorWrapper(generateCertificate));
