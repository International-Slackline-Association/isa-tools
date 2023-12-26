import express, { Request, Response } from 'express';
import { catchExpressJsErrorWrapper, validateApiPayload, verifyTrustedServiceRequest } from '../utils';
import { certificates } from 'core/certificates';
import { createVerifiableDocument } from 'core/documentVerification';
import { ListCertificatesQueryParams, listCertificatesQueryParamsSchema } from './schema';

export const getAllInstructorCertificates = async (req: Request, res: Response) => {
  const instructors = await certificates.getInstructors();
  res.json({ items: instructors });
};

export const getAllRiggerCertificates = async (req: Request, res: Response) => {
  const riggers = await certificates.getRiggers();
  res.json({ items: riggers[0] });
};

export const listCertificates = async (req: Request<any, any, any, ListCertificatesQueryParams>, res: Response) => {
  verifyTrustedServiceRequest(req);

  const query = validateApiPayload(req.query, listCertificatesQueryParamsSchema);

  const x = await certificates.getAllCertificates({
    isaId: query.userId,
    email: query.email,
  });

  res.json({ items: x });
};

// export const getInstructorCertificate = async (req: Request, res: Response) => {
//   const { name, surname } = await validateUserExists(req.user.isaId);
//   const cert = (await getInstructorsFromSpreadsheet(req.params.certId))[0];
//   const [day, month, year] = cert.endDate.split('.').map((c) => parseInt(c));
//   const expiresInSeconds = Math.floor((new Date(year, month - 1, day).getTime() - new Date().getTime()) / 1000);

//   const { verificationUrl } = await createVerifiableDocument({
//     subject: `${name} ${surname}`,
//     expiresInSeconds: expiresInSeconds,
//     createHash: true,
//     content: `"${cert.name} ${cert.surname}" has a valid "${cert.level}" certificate valid until "${cert.endDate}"`,
//   });
//   res.json({ verificationUrl });
// };

// export const getRiggerCertificate = async (req: Request, res: Response) => {
//   const { name, surname } = await validateUserExists(req.user.isaId);
//   const cert = (await getRiggersFromSpreadsheet(req.params.certId))[0];
//   const [day, month, year] = cert.endDate.split('.').map((c) => parseInt(c));
//   const expiresInSeconds = Math.floor((new Date(year, month - 1, day).getTime() - new Date().getTime()) / 1000);

//   const { verificationUrl } = await createVerifiableDocument({
//     subject: `${name} ${surname}`,
//     expiresInSeconds: expiresInSeconds,
//     createHash: true,
//     content: `"${cert.name} ${cert.surname}" has a valid "${cert.level}" certificate valid until "${cert.endDate}"`,
//   });
//   res.json({ verificationUrl });
// };

// export const getWorldRecordCertificate = async (req: Request, res: Response) => {
//   const { name, surname } = await validateUserExists(req.user.isaId);
//   const cert = (await getWorldRecordsFromSpreadsheet(req.params.certId))[0];

//   const { verificationUrl } = await createVerifiableDocument({
//     subject: `${name} ${surname}`,
//     expiresInSeconds: 60 * 60 * 24 * 365 * 1, // 1 year
//     createHash: true,
//     content: `"${cert.name}" has a valid world record certificate for "${cert.recordType}" with specs "${cert.specs}"`,
//   });
//   res.json({ verificationUrl });
// };

export const certificateApi = express.Router();
certificateApi.get('/', catchExpressJsErrorWrapper(listCertificates));
// certificateApi.get('/instructor/:certId', catchExpressJsErrorWrapper(getInstructorCertificate));
// certificateApi.get('/rigger/:certId', catchExpressJsErrorWrapper(getRiggerCertificate));
// certificateApi.get('/world-record/:certId', catchExpressJsErrorWrapper(getWorldRecordCertificate));
// certificateApi.get('/instructors', catchExpressJsErrorWrapper(getAllInstructorCertificates));
// certificateApi.get('/riggers', catchExpressJsErrorWrapper(getAllRiggerCertificates));
