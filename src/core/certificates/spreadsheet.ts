import { GetParameterCommand, GetParametersCommand } from '@aws-sdk/client-ssm';
import { ssm } from 'core/aws/clients';
import { google, sheets_v4 } from 'googleapis';
import { CertificateType } from './types';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const googleCredsSSMParameter = 'isa-documents-google-credentials-json';
const certificatesSpreadsheetId = '1WO8RDDn6WKTmZQX4YK9xNwWfh0-eciIX0fdSvsgNRsA';

let sheets: sheets_v4.Sheets;
const cache: {
  googleCreds?: any;
  ranges: { [key: string]: sheets_v4.Schema$ValueRange[] | undefined };
  expiresIn: number;
} = {
  ranges: {},
  expiresIn: Date.now() + 1000 * 60 * 5, // 5 minutes
};

export const initSpreadsheets = async () => {
  return authorizeSpreadsheet();
};

export const getSpreadsheetValues = async (range: string) => {
  const cachedValue = cache.ranges[range] || [];
  if (cachedValue.length > 0 && cache.expiresIn > Date.now()) {
    return cachedValue;
  }
  await authorizeSpreadsheet();

  const result = await sheets.spreadsheets.values.batchGet({
    spreadsheetId: certificatesSpreadsheetId,
    ranges: [range],
  });
  cache.ranges[range] = result.data.valueRanges;
  cache.expiresIn = Date.now() + 1000 * 60 * 5; // 5 minutes
  return result.data.valueRanges;
};

const authorizeSpreadsheet = async () => {
  if (!sheets) {
    const ssmParam = await ssm.send(new GetParameterCommand({ Name: googleCredsSSMParameter }));
    const googleCreds = JSON.parse(ssmParam.Parameter?.Value || '');
    const client = new google.auth.JWT(googleCreds.client_email, undefined, googleCreds.private_key, SCOPES);
    await client.authorize();
    sheets = google.sheets({ version: 'v4', auth: client });
  }
};
