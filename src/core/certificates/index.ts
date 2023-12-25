import { sheets_v4 } from 'googleapis';
import { getSpreadsheetValues } from './spreadsheet';
import { CertificateType } from './types';

export const getInstructors = async () => {
  return getCertificate('instructor', [
    'certId',
    'isaId',
    'email',
    'name',
    'surname',
    'level',
    'startDate',
    'endDate',
    'country',
  ]);
};

export const getRiggers = async () => {
  return getCertificate('rigger', [
    'certId',
    'isaId',
    'email',
    'name',
    'surname',
    'level',
    'startDate',
    'endDate',
    'country',
  ]);
};

export const getAthleticAwards = async () => {
  return getCertificate('athletic-award', [
    'certId',
    'isaId',
    'email',
    'name',
    'surname',
    'representing',
    'rank',
    'competitionName',
    'location',
    'date',
    'contestSize',
    'category',
    'discipline',
  ]);
};

export const getAthleteExcellences = async () => {
  return getCertificate('athlete-certificate-of-exellence', [
    'certId',
    'isaId',
    'email',
    'name',
    'surname',
    'representing',
    'year',
    'rank',
    'category',
    'discipline',
  ]);
};

export const getContestOrganizers = async () => {
  return getCertificate('contest-organizer', [
    'certId',
    'isaId',
    'email',
    'name',
    'surname',
    'contestName',
    'location',
    'date',
    'discipline',
    'contestSize',
  ]);
};

export const getJudges = async () => {
  return getCertificate('judge', [
    'certId',
    'isaId',
    'email',
    'name',
    'surname',
    'contestName',
    'location',
    'date',
    'discipline',
    'contestSize',
  ]);
};

export const getISAMembers = async () => {
  return getCertificate('isa-membership', ['certId', 'isaId', 'email', 'membership', 'name', 'date', 'location']);
};

export const getWorldRecords = async () => {
  return getCertificate('world-record', [
    'certId',
    'isaId',
    'email',
    'name',
    'recordType',
    'specs',
    'name',
    'category',
    'date',
  ]);
};

export const getHonoraryMembers = async () => {
  return getCertificate('honoraryMember', ['certId', 'isaId', 'email', 'name', 'date']);
};

export const getApprovedGears = async () => {
  return getCertificate('approved-gear', [
    'certId',
    'isaId',
    'email',
    'brand',
    'modelName',
    'modelVersion',
    'releaseYear',
    'productLink',
    'manualLink',
    'testingLaboratory',
    'testDate',
    'productType',
    'standard',
    'standardVersion',
  ]);
};
const getCertificate = async <T extends string>(certificateType: CertificateType, obj: T[]) => {
  const valueRanges = await getSpreadsheetValues([certificateType]);
  const data: { [key in T]: string }[] = [];

  if (!valueRanges) {
    return data;
  }

  for (const valueRange of valueRanges) {
    const range = valueRange.range;
    const rangeData = valueRange.values;

    const rows = rangeData?.slice(1) ?? [];
    for (const row of rows) {
      const v: { [key in T]: string } = {} as any;
      for (let i = 0; i < obj.length; i++) {
        const fieldName = obj[i];
        let rowValue = row[i]?.trim() as string;
        if (fieldName.toLowerCase().includes('date')) {
          rowValue = rowValue.toLowerCase();
        }
        if (['isaId', 'email'].includes(fieldName)) {
          rowValue = rowValue.toLowerCase();
        }
        v[fieldName] = rowValue;
      }
      data.push(v);
    }
  }
  return data;
};

const isSpreadsheetRowMatching = (rows: string[], isaId?: string, isaEmail?: string, certificateId?: string) => {
  const rCertificateId = rows[0]?.toLowerCase();
  const rId = rows[1]?.toLowerCase();
  const rEmail = rows[2]?.toLowerCase();

  if (!rId && !rEmail) {
    return false;
  }

  const id = isaId?.toLowerCase();
  const email = isaEmail?.toLowerCase();
  if (certificateId && rCertificateId !== certificateId) {
    return false;
  }
  return rId === id || rEmail === email;
};

export const certificates = {
  getISAMembers,
  getInstructors,
  getRiggers,
  getWorldRecords,
};
