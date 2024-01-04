import { CertificateType } from '../types';
import { getSpreadsheetValues, initSpreadsheets } from './spreadsheet';

type FilterBy = {
  isaId?: string;
  email?: string;
  certId?: string;
};

const getInstructors = async (filterBy: FilterBy = {}) => {
  return getCertificates('instructor', [
    'certId',
    'isaId',
    'email',
    'name',
    'surname',
    'level',
    'startDate',
    'endDate',
    'country',
  ]).then(filterCertificates(filterBy));
};

const getRiggers = async (filterBy: FilterBy = {}) => {
  return getCertificates('rigger', [
    'certId',
    'isaId',
    'email',
    'name',
    'surname',
    'level',
    'startDate',
    'endDate',
    'country',
  ]).then(filterCertificates(filterBy));
};

const getAthleticAwards = async (filterBy: FilterBy = {}) => {
  return getCertificates('athletic-award', [
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
  ]).then(filterCertificates(filterBy));
};

const getAthleteExcellences = async (filterBy: FilterBy = {}) => {
  return getCertificates('athlete-excellence', [
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
  ]).then(filterCertificates(filterBy));
};

const getContestOrganizers = async (filterBy: FilterBy = {}) => {
  return getCertificates('contest-organizer', [
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
  ]).then(filterCertificates(filterBy));
};

const getJudges = async (filterBy: FilterBy = {}) => {
  return getCertificates('judge', [
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
  ]).then(filterCertificates(filterBy));
};

const getISAMembers = async (filterBy: FilterBy = {}) => {
  return getCertificates('isa-membership', ['certId', 'isaId', 'email', 'membership', 'name', 'date', 'location']).then(
    filterCertificates(filterBy),
  );
};

const getWorldRecords = async (filterBy: FilterBy = {}) => {
  return getCertificates('world-record', [
    'certId',
    'isaId',
    'email',
    'recordType',
    'specs',
    'name',
    'category',
    'date',
  ]).then(filterCertificates(filterBy));
};

const getHonoraryMembers = async (filterBy: FilterBy = {}) => {
  return getCertificates('honoraryMember', ['certId', 'isaId', 'email', 'name', 'date']).then(
    filterCertificates(filterBy),
  );
};

const getApprovedGears = async (filterBy: FilterBy = {}) => {
  return getCertificates('approved-gear', [
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
  ]).then(filterCertificates(filterBy));
};

const getAllItems = async (filterBy: FilterBy = {}) => {
  await initSpreadsheets();

  const certs: {
    certificateType: CertificateType;
    certId?: string;
    title?: string;
    isaId?: string;
    email?: string;
  }[] = [];

  const addToCertificates = <T extends { isaId?: string; email?: string; certId?: string }>(
    certificateType: CertificateType,
    title: (item?: T) => string | undefined,
  ) => {
    return (items: T[]) => {
      for (const item of items) {
        certs.push({
          certificateType,
          title: title(item),
          isaId: item.isaId,
          email: item.email,
          certId: item.certId,
        });
      }
    };
  };

  const promises: Promise<any>[] = [];

  promises.push(getInstructors(filterBy).then(addToCertificates('instructor', (i) => i?.level)));
  promises.push(getRiggers(filterBy).then(addToCertificates('rigger', (r) => r?.level)));
  promises.push(getAthleticAwards(filterBy).then(addToCertificates('athletic-award', (a) => 'Athletic Award')));
  promises.push(
    getAthleteExcellences(filterBy).then(
      addToCertificates('athlete-excellence', (a) => 'Athlete Excellence'),
    ),
  );
  promises.push(
    getContestOrganizers(filterBy).then(
      addToCertificates('contest-organizer', (c) => `Contest Organizer: ${c?.contestName}`),
    ),
  );
  promises.push(getJudges(filterBy).then(addToCertificates('judge', (j) => `Judge: ${j?.contestName}`)));
  promises.push(getISAMembers(filterBy).then(addToCertificates('isa-membership', (i) => 'ISA Membership')));
  promises.push(getWorldRecords(filterBy).then(addToCertificates('world-record', (w) => `World Record: ${w?.specs}`)));
  promises.push(getHonoraryMembers(filterBy).then(addToCertificates('honoraryMember', (h) => 'Honorary Member')));
  promises.push(
    getApprovedGears(filterBy).then(addToCertificates('approved-gear', (g) => `Approved Gear: ${g?.brand}`)),
  );

  await Promise.all(promises);
  return certs;
};

const getCertificates = async <T extends string>(certificateType: CertificateType, obj: T[]) => {
  const range = certificateTypeToRange(certificateType);
  const valueRanges = await getSpreadsheetValues(range);
  const data: { [key in T]: string | undefined }[] = [];

  if (!valueRanges) {
    return data;
  }

  for (const valueRange of valueRanges) {
    const range = valueRange.range;
    const rangeData = valueRange.values;

    const headers = rangeData?.[0] ?? [];
    const rows = rangeData?.slice(1) ?? [];
    for (const row of rows) {
      const v: { [key in T]: string | undefined } = {} as any;
      for (let i = 0; i < obj.length; i++) {
        const fieldName = obj[i];
        let rowValue = row[i]?.trim() as string | undefined;
        if (!rowValue) {
          continue;
        }
        if (fieldName.toLowerCase().includes('date')) {
          rowValue = rowValue?.toLowerCase();
        }
        if (['isaId', 'email'].includes(fieldName)) {
          rowValue = rowValue?.toLowerCase();
        }
        v[fieldName] = rowValue;
      }
      data.push(v);
    }
  }
  return data;
};

const filterCertificates = <T extends { isaId?: string; email?: string; certId?: string }>(filterBy: FilterBy = {}) => {
  return (certificates: T[]) =>
    certificates.filter((certificate) => {
      const id = filterBy.isaId?.toLowerCase();
      const email = filterBy.email?.toLowerCase();
      const certId = filterBy.certId?.toLowerCase();

      if (certId && certificate.certId?.toLowerCase() !== certId) {
        return false;
      }
      return id === certificate.isaId?.toLowerCase() || email === certificate.email?.toLowerCase();
    });
};

const certificateTypeToRange = (certificateType: CertificateType) => {
  switch (certificateType) {
    case 'instructor':
      return 'Instructors';
    case 'rigger':
      return 'Riggers';
    case 'athletic-award':
      return 'Athletic Award(Contest)';
    case 'athlete-excellence':
      return 'Athlete Certificate Of Exellence(Year)';
    case 'contest-organizer':
      return 'Contest Organizer';
    case 'judge':
      return 'Judge';
    case 'isa-membership':
      return 'ISA Membership';
    case 'world-record':
      return 'World Records';
    case 'honoraryMember':
      return 'Honorary Members';
    case 'approved-gear':
      return 'Approved Gear';
  }
};

export const certificateSpreadsheet = {
  getInstructors,
  getRiggers,
  getAthleticAwards,
  getAthleteExcellences,
  getContestOrganizers,
  getJudges,
  getISAMembers,
  getWorldRecords,
  getHonoraryMembers,
  getApprovedGears,
  getAllItems,
};
