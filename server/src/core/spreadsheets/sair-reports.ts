import * as dateFns from 'date-fns';

import { getSpreadsheetValues } from './utils';

export const getSairReports = async () => {
  return getSpreadsheetValues('Full translated', 'sair-reports', [
    'language',
    'timestamp',
    'narrative',
    'analysis',
    'countryName',
    'incidentDate',
    'slacklineType',
    'incidentType',
    'severity',
    'injuryType',
    'injuryLocation',
    'filters',
  ]).then((data) => {
    type R = (typeof data)[0] & { incidentDateParsed: Date };
    return data
      .filter((d) => Object.keys(d).length > 0)
      .map<R>((d) => {
        const parsedDate = dateFns.parse(d.incidentDate!, 'M/dd/yyyy', new Date());
        const incidentDateFormatted = dateFns.format(parsedDate, 'dd.MM.yyyy');
        return {
          ...d,
          incidentDate: incidentDateFormatted,
          incidentDateParsed: parsedDate,
        };
      });
  });
};
