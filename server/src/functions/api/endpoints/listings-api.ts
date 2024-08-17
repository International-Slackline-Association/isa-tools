import { formatCertificateDate } from 'core/certificates/generators/utils';
import { certificateSpreadsheet } from 'core/spreadsheets/certificates';
import { getEquipmentWarnings } from 'core/spreadsheets/equipment-warnings';
import { getSairReports } from 'core/spreadsheets/sair-reports';
import express, { Request } from 'express';

import { expressRoute, verifyTrustedDomainRequest } from '../utils';

export const listInstructors = async (req: Request) => {
  verifyTrustedDomainRequest(req);

  const instructors = await certificateSpreadsheet.getInstructors();

  // s
  const items = instructors
    .map((i) => ({
      email: i.email,
      certId: i.certId,
      name: `${i.name ?? ''} ${i.surname ?? ''}`,
      country: i.country,
      level: i.level,
      expirationDate: formatCertificateDate(i.endDate, undefined, { safeParse: true }).pretty,
    }))
    .sort(sortByField('country', 'name'))
    .filter((i) => i.name.length > 2);

  return { items };
};

export const listRiggers = async (req: Request) => {
  verifyTrustedDomainRequest(req);

  const riggers = await certificateSpreadsheet.getRiggers();
  const items = riggers
    .map((i) => ({
      email: i.email,
      certId: i.certId,
      name: `${i.name ?? ''} ${i.surname ?? ''}`,
      country: i.country,
      level: i.level,
      expirationDate: formatCertificateDate(i.endDate, undefined, { safeParse: true }).pretty,
    }))
    .sort(sortByField('country', 'name'))
    .filter((i) => i.name.length > 2);

  return { items };
};

export const listCertifiedGears = async (req: Request) => {
  verifyTrustedDomainRequest(req);

  const gears = await certificateSpreadsheet.getApprovedGears();
  const items = gears
    .map((i) => {
      const { isaId, ...rest } = i;
      return rest;
    })
    .sort(sortByField('brand'));

  return { items };
};

export const listEquipmentWarnings = async (req: Request) => {
  verifyTrustedDomainRequest(req);

  const warnings = await getEquipmentWarnings();
  const items = warnings.sort((a, b) => {
    if (a.status === 'Recall' && b.status !== 'Recall') return -1;
    if (a.status !== 'Recall' && b.status === 'Recall') return 1;

    if (a.status === 'Warning' && b.status !== 'Warning') return -1;
    if (a.status !== 'Warning' && b.status === 'Warning') return 1;

    return 0;
  });

  return { items };
};

export const listSairReports = async (req: Request) => {
  verifyTrustedDomainRequest(req);

  const reports = await getSairReports();
  const items = reports.sort(sortByField('incidentDate'));

  return { items };
};

const sortByField = (...fields: string[]) => {
  return (a: any, b: any) => {
    for (const field of fields) {
      if ((a[field] ?? '') < (b[field] ?? '')) return -1;
      if ((a[field] ?? '') > (b[field] ?? '')) return 1;
    }
    return 0;
  };
};

export const listingsApi = express.Router();
listingsApi.get('/instructors', expressRoute(listInstructors));
listingsApi.get('/riggers', expressRoute(listRiggers));
listingsApi.get('/approved-gears', expressRoute(listCertifiedGears));
listingsApi.get('/equipment-warnings', expressRoute(listEquipmentWarnings));
listingsApi.get('/sair-reports', expressRoute(listSairReports));
