import express, { Request, Response } from 'express';
import { catchExpressJsErrorWrapper, validateApiPayload, verifyTrustedServiceRequest } from '../utils';
import { certificateSpreadsheet } from 'core/certificates/spreadsheet';
import {
  ListCertificatesQueryParams,
  SignDocumentePostBody,
  listCertificatesQueryParamsSchema,
  signDocumentPostBodySchema,
} from './schema';

import { createSignedDocument } from 'core/documentVerification';

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
