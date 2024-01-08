import { getSpreadsheetValues } from './utils';
import * as dateFns from 'date-fns';

export const getEquipmentWarnings = async () => {
  return getSpreadsheetValues('Warnings', 'equipment-warnings', [
    'status',
    'date',
    'productType',
    'model',
    'manufacturer',
    'inProduction',
    'description',
    'solution',
    'productImage',
    'link1',
    'link2',
  ]);
};
