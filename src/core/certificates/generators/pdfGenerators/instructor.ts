import PDF_EN from './templates/instructor-en.pdf';

import { PDFDocument } from 'pdf-lib';
import { convertToYCoordinate, loadPDFTemplate, black, embedQRCodeToPDF } from './utils';
import { PDFModificationsObject } from './types';

interface Props {
  fullname: string;
  level: string;
  startDate: string;
  endDate: string;
}

export const PDFs: { [key: string]: string } = { en: PDF_EN };

export async function generate(language: string, data: Props, qrCodeUrl: string): Promise<PDFDocument> {
  const blankPDF = PDFs[language] || PDFs.en;

  const { boldFont, page, pageHeight, pageWidth, pdfDoc, semiboldFont, berkshireFont } =
    await loadPDFTemplate(blankPDF);

  const modifications: PDFModificationsObject<Props> = {
    fullname: {
      size: 32,
      font: berkshireFont,
      color: black,
      x: pageWidth / 2 - berkshireFont.widthOfTextAtSize(data.fullname, 32) / 2,
      y: convertToYCoordinate(172, pageHeight, berkshireFont, 32),
    },
    level: {
      size: 21,
      font: boldFont,
      color: black,
      x: pageWidth / 2 - boldFont.widthOfTextAtSize(data.level, 21) / 2,
      y: convertToYCoordinate(290, pageHeight, boldFont, 21),
    },
    startDate: {
      size: 11,
      font: semiboldFont,
      color: black,
      x: 400,
      y: convertToYCoordinate(387, pageHeight, semiboldFont, 11),
    },
    endDate: {
      size: 11,
      font: semiboldFont,
      color: black,
      x: 570,
      y: convertToYCoordinate(387, pageHeight, semiboldFont, 11),
    },
  };

  for (const [key, value] of Object.entries(modifications)) {
    page.drawText(data[key as keyof Props], {
      ...value,
    });
  }

  if (qrCodeUrl) {
    await embedQRCodeToPDF(pdfDoc, qrCodeUrl, {
      x: 696,
      y: 438,
    });
  }

  return pdfDoc;
}
