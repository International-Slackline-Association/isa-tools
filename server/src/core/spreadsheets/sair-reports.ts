import { getSpreadsheetValues } from './utils';

export const getSairReports = async () => {
  return getSpreadsheetValues('Processed', 'sair-reports', [
    '_',
    '_',
    'narrative',
    'analysis',
    'countryName',
    'incidentDate',
    'slacklineType',
    'incidentType',
    'severity',
    'injuryType',
    'injuryLocation',
    '_',
    'filters',
  ]).then((data) => {
    return data.filter((d) => Object.keys(d).length > 0);
  });
};
