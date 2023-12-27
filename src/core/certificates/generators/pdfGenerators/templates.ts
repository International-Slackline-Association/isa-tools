import WORLD_RECORD_EN from './templates/world-record-en.pdf';
import INSTRUCTOR_EN from './templates/instructor-en.pdf';
import RIGGER_EN from './templates/rigger-en.pdf';
import { CertificateType } from 'core/certificates/types';

export const blankPDFTemplate = (certificateType: CertificateType, language: string) => {
  switch (certificateType) {
    case 'instructor':
      return INSTRUCTOR_EN;
    case 'rigger':
      return RIGGER_EN;
    case 'world-record':
      return WORLD_RECORD_EN;
    default:
      throw new Error(`Cannot find pdf template for certificate type ${certificateType}`);
  }
};
