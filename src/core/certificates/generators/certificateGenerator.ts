import { PDFDocument } from 'pdf-lib';
import * as dateFns from 'date-fns';
import fs from 'fs';

import { CertificateType } from '../types';
import { certificateSpreadsheet } from '../spreadsheet';
import { createVerifiableDocument } from 'core/documentVerification';
import { pdfGenerators } from './pdfGenerators';
import { putCertificateToS3 } from './s3';

export const generate = async (
  payload: {
    certificateType: CertificateType;
    certificateId: string;
    subject: string;
    language: string;
  },
  opts: {
    writeToLocal?: boolean;
  } = {},
) => {
  const { certificateType, certificateId, subject, language } = payload;
  let pdf: PDFDocument | undefined;
  switch (certificateType) {
    case 'instructor':
      pdf = await generateInstructor({ certificateId, subject, language, skipQRCode: opts.writeToLocal });
      break;
    default:
      break;
  }
  if (!pdf) {
    throw new Error('Certificate cannot be generated!');
  }

  const bytes = await pdf.save();
  const buffer = Buffer.from(bytes);

  let presignedUrl: string | undefined;
  if (opts.writeToLocal) {
    fs.writeFileSync(`./${certificateId}.pdf`, buffer);
  } else {
    const resp = await putCertificateToS3(`${certificateId}.pdf`, buffer);
    presignedUrl = resp.presignedUrl;
  }
  return { presignedUrl };
};

const generateInstructor = async (payload: {
  certificateId: string;
  subject: string;
  language: string;
  skipQRCode?: boolean;
}) => {
  const { certificateId, subject, language } = payload;
  const instructorItem = (await certificateSpreadsheet.getInstructors({ certId: certificateId }))[0];

  const startDate = dateFns.format(dateFns.parse(instructorItem.startDate!, 'dd.MM.yyyy', new Date()), 'PP');
  const endDate = dateFns.parse(instructorItem.endDate!, 'dd.MM.yyyy', new Date());
  const endDateString = dateFns.format(endDate, 'PP');

  let verificationUrl: string | undefined;

  if (payload.skipQRCode) {
    verificationUrl = '';
  } else {
    const document = await createVerifiableDocument({
      subject,
      expiresInSeconds: dateFns.differenceInSeconds(endDate, new Date()),
      createHash: true,
      content: `"${instructorItem.name} ${instructorItem.surname}" has a valid "${instructorItem.level}" certificate valid until "${endDateString}"`,
    });
    verificationUrl = document.verificationUrl;
  }

  const pdf = await pdfGenerators.generateInstructorPDF(
    language,
    {
      fullname: `${instructorItem.name} ${instructorItem.surname}`.toUpperCase(),
      level: instructorItem.level!.toUpperCase(),
      startDate: startDate,
      endDate: endDateString,
    },
    verificationUrl,
  );
  return pdf;
};

export const certificateGenerator = {
  generate,
};

const openPDF = async (pdf: PDFDocument) => {
  const pdfBytes = await pdf.save();
  const file = new Blob([pdfBytes], { type: 'application/pdf' });
  const fileURL = URL.createObjectURL(file);
  const pdfWindow = window.open();
  pdfWindow!.location.href = fileURL;
};

async function downloadPDF(pdf: PDFDocument, fileName: string) {
  const pdfBytes = await pdf.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
}
