import { getSpreadsheetValues } from './utils';

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
