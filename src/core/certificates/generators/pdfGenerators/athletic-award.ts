import PDF_EN from './templates/athletic-award-en.pdf';

import { PDFDocument } from 'pdf-lib';
import { PDFModificationsObject } from './types';
import { loadPDFTemplate, isaRed, convertToYCoordinate, isaBlue } from './utils';

interface Props {
  fullname: string;
  representing: string;
  rank: string;
  competitionName: string;
  location: string;
  dateOfFinals: string;
  contestSize: string;
  category: string;
  discipline: string;
}

export const PDFs: { [key: string]: string } = { en: PDF_EN };

export async function generate(language: string, data: Props): Promise<PDFDocument> {
  const blankPDF = PDFs[language] || PDFs.en;

  const { boldFont, page, pageHeight, pageWidth, pdfDoc, semiboldFont } = await loadPDFTemplate(blankPDF);

  const modifications: PDFModificationsObject<Props> = {
    fullname: {
      size: 21,
      font: boldFont,
      color: isaRed,
      x: pageWidth / 2 - boldFont.widthOfTextAtSize(data.fullname, 21) / 2,
      y: convertToYCoordinate(197, pageHeight, boldFont, 21),
    },
    representing: {
      size: 16,
      font: semiboldFont,
      color: isaBlue,
      x: 430,
      y: convertToYCoordinate(232, pageHeight, semiboldFont, 16),
    },
    rank: {
      size: 12,
      font: semiboldFont,
      color: isaBlue,
      x: 430,
      y: convertToYCoordinate(266, pageHeight, semiboldFont, 12),
    },
    competitionName: {
      size: 12,
      font: semiboldFont,
      color: isaBlue,
      x: 430,
      y: convertToYCoordinate(282, pageHeight, semiboldFont, 12),
    },
    location: {
      size: 12,
      font: semiboldFont,
      color: isaBlue,
      x: 430,
      y: convertToYCoordinate(298, pageHeight, semiboldFont, 12),
    },
    dateOfFinals: {
      size: 12,
      font: semiboldFont,
      color: isaBlue,
      x: 430,
      y: convertToYCoordinate(314, pageHeight, semiboldFont, 12),
    },
    contestSize: {
      size: 12,
      font: semiboldFont,
      color: isaBlue,
      x: 430,
      y: convertToYCoordinate(330, pageHeight, semiboldFont, 12),
    },
    category: {
      size: 12,
      font: semiboldFont,
      color: isaBlue,
      x: 430,
      y: convertToYCoordinate(346, pageHeight, semiboldFont, 12),
    },
    discipline: {
      size: 12,
      font: semiboldFont,
      color: isaBlue,
      x: 430,
      y: convertToYCoordinate(362, pageHeight, semiboldFont, 12),
    },
  };

  for (const [key, value] of Object.entries(modifications)) {
    page.drawText(data[key as keyof Props], {
      ...value,
    });
  }

  return pdfDoc;
}
