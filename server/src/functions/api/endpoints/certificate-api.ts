import express, { Request, Response } from 'express';
import { wrapEndpoint, validateApiPayload, verifyTrustedDomainRequest, verifyTrustedServiceRequest } from '../utils';
import { certificateSpreadsheet } from 'core/spreadsheets/certificates';
import {
  GenerateCertificatePostBody,
  ListCertificatesQueryParams,
  generateCertificatePostBodySchema,
  listCertificatesQueryParamsSchema,
} from './schema';
import { generateCertificatePDF } from 'core/certificates/generators/certificateGenerator';
import { CertificateType } from 'core/spreadsheets/types';
import { uploadPDFToS3 } from 'core/aws/s3';
import { formatCertificateDate } from 'core/certificates/generators/utils';

const listCertificates = async (req: Request<any, any, any, ListCertificatesQueryParams>) => {
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

  return { certificates: certs, certificateLanguages };
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

  return { pdfUrl: presignedUrl, certificateId: body.certificateId };
};

export const certificateApi = express.Router();
certificateApi.get('/', wrapEndpoint(listCertificates));
certificateApi.post('/generate', wrapEndpoint(generateCertificate));
