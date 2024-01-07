// import PDF_EN from './templates/contest-organizer-en.pdf';

// import { PDFDocument, PDFFont, RGB } from 'pdf-lib';
// import {
//   convertToYCoordinate,
//   isaBlue,
//   isaRed,
//   loadPDFTemplate,
// } from 'app/components/MyCertificates/pdfGenerators/utils';
// import { PDFModificationsObject } from 'app/components/MyCertificates/pdfGenerators/types';

// interface Props {
//   fullname: string;
//   contestName: string;
//   country: string;
//   date: string;
//   discipline: string;
//   contestSize: string;
// }

// export const PDFs = { en: PDF_EN };

// export async function generate(
//   language: string,
//   data: Props,
// ): Promise<PDFDocument> {
//   const blankPDF = PDFs[language] || PDFs.en;

//   const { boldFont, page, pageHeight, pageWidth, pdfDoc, semiboldFont } =
//     await loadPDFTemplate(blankPDF);

//   const modifications: PDFModificationsObject<Props> = {
//     fullname: {
//       size: 21,
//       font: boldFont,
//       color: isaRed,
//       x: pageWidth / 2 - boldFont.widthOfTextAtSize(data.fullname, 21) / 2,
//       y: convertToYCoordinate(197, pageHeight, boldFont, 21),
//     },
//     contestName: {
//       size: 12,
//       font: semiboldFont,
//       color: isaBlue,
//       x: 430,
//       y: convertToYCoordinate(294, pageHeight, semiboldFont, 12),
//     },
//     country: {
//       size: 12,
//       font: semiboldFont,
//       color: isaBlue,
//       x: 430,
//       y: convertToYCoordinate(312, pageHeight, semiboldFont, 12),
//     },
//     date: {
//       size: 12,
//       font: semiboldFont,
//       color: isaBlue,
//       x: 430,
//       y: convertToYCoordinate(331, pageHeight, semiboldFont, 12),
//     },
//     discipline: {
//       size: 12,
//       font: semiboldFont,
//       color: isaBlue,
//       x: 430,
//       y: convertToYCoordinate(349, pageHeight, semiboldFont, 12),
//     },
//     contestSize: {
//       size: 12,
//       font: semiboldFont,
//       color: isaBlue,
//       x: 430,
//       y: convertToYCoordinate(367, pageHeight, semiboldFont, 12),
//     },
//   };

//   for (const [key, value] of Object.entries(modifications)) {
//     page.drawText(data[key], {
//       ...value,
//     });
//   }

//   return pdfDoc;
// }
