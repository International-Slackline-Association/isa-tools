import { GetParametersCommand } from '@aws-sdk/client-ssm';
import { ssm } from 'core/aws/clients';
import { google, sheets_v4 } from 'googleapis';
import { CertificateType } from './types';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const googleCredsSSMParameter = 'isa-documents-google-credentials-json';
const spreadsheetIdSSMParameter = 'isa-documents-certificates-spreadsheetId';

let sheets: sheets_v4.Sheets;
let cache: {
  googleCreds: any;
  spreadsheetId: string;
};

export const getSpreadsheetValues = async (certificateTypes: CertificateType[]) => {
  await authorize();
  const { spreadsheetId } = await loadSSMParameters();

  const ranges = certificateTypes.map((r) => certificateTypeToRange(r));
  const result = await sheets.spreadsheets.values.batchGet({
    spreadsheetId,
    ranges,
  });
  return result.data.valueRanges;
};

const certificateTypeToRange = (certificateType: CertificateType) => {
  switch (certificateType) {
    case 'instructor':
      return 'Instructors';
    case 'rigger':
      return 'Riggers';
    case 'athletic-award':
      return 'Athletic Award(Contest)';
    case 'athlete-certificate-of-exellence':
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

const loadSSMParameters = async () => {
  if (cache) {
    return cache;
  }
  const ssmParam = await ssm.send(
    new GetParametersCommand({ Names: [googleCredsSSMParameter, spreadsheetIdSSMParameter] }),
  );
  const googleCreds = JSON.parse(ssmParam.Parameters?.filter((p) => p.Name === googleCredsSSMParameter)[0].Value ?? '');
  const spreadsheetId = ssmParam.Parameters?.filter((p) => p.Name === spreadsheetIdSSMParameter)[0].Value ?? '';
  cache = { googleCreds, spreadsheetId };
  return { googleCreds, spreadsheetId };
};

const authorize = async () => {
  if (!sheets) {
    const { googleCreds } = await loadSSMParameters();
    const client = new google.auth.JWT(googleCreds.client_email, undefined, googleCreds.private_key, SCOPES);
    await client.authorize();
    sheets = google.sheets({ version: 'v4', auth: client });
  }
};
