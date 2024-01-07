import express, { Request, Response } from 'express';
import {
  catchExpressJsErrorWrapper,
  validateApiPayload,
  verifyTrustedDomainRequest,
  verifyTrustedServiceRequest,
} from '../utils';
import { certificateSpreadsheet } from 'core/certificates/spreadsheet';
import {
  GenerateCertificatePostBody,
  ListCertificatesQueryParams,
  generateCertificatePostBodySchema,
  listCertificatesQueryParamsSchema,
} from './schema';
import { generateCertificatePDF } from 'core/certificates/generators/certificateGenerator';
import { CertificateType } from 'core/certificates/types';
import { uploadPDFToS3 } from 'core/aws/s3';

const listCertificates = async (req: Request<any, any, any, ListCertificatesQueryParams>, res: Response) => {
  verifyTrustedDomainRequest(req);

  const query = validateApiPayload(req.query, listCertificatesQueryParamsSchema);

  const certs = await certificateSpreadsheet.getAllItems({
    isaId: query.isaId,
    email: query.email,
  });

  const certificateLanguages: { [key in CertificateType]: string[] } = {
    instructor: ['en'],
    rigger: ['en'],
    'athletic-award': ['en'],
    'athlete-excellence': ['en'],
    'isa-membership': ['en'],
    'world-record': ['en'],
    'approved-gear': [],
    judge: [],
    'contest-organizer': [],
    'honorary-member': [],
  };

  res.json({ certificates: certs, certificateLanguages });
};

const generateCertificate = async (req: Request<any, any, GenerateCertificatePostBody>, res: Response) => {
  verifyTrustedServiceRequest(req);

  const body = validateApiPayload(req.body, generateCertificatePostBodySchema);

  const { pdfBytes } = await generateCertificatePDF({
    certificateType: body.certificateType as CertificateType,
    certificateId: body.certificateId,
    subject: body.subject,
    language: body.language,
  });

  const buffer = Buffer.from(pdfBytes);
  const { presignedUrl } = await uploadPDFToS3(`certificates/${body.certificateId}-${body.language}.pdf`, buffer);

  res.json({ pdfUrl: presignedUrl, certificateId: body.certificateId });
};

export const certificateApi = express.Router();
certificateApi.get('/', catchExpressJsErrorWrapper(listCertificates));
certificateApi.post('/generate', catchExpressJsErrorWrapper(generateCertificate));
