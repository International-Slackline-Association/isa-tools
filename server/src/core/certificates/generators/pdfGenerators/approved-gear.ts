// import PDF_EN from './templates/approved-gear-en.pdf';

// import { PDFDocument, PDFFont, RGB } from 'pdf-lib';
// import {
//   convertToYCoordinate,
//   isaBlue,
//   isaRed,
//   loadPDFTemplate,
// } from 'app/components/MyCertificates/pdfGenerators/utils';
// import { PDFModificationsObject } from 'app/components/MyCertificates/pdfGenerators/types';

// interface Props {
//   brand: string;
//   modelName: string;
//   modelVersion: string;
//   releaseYear: string;
//   productLink: string;
//   manualLink: string;
//   testingLab: string;
//   testDate: string;
//   productType: string;
//   standard: string;
//   standardVersion: string;
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
//     modelName: {
//       size: 21,
//       font: boldFont,
//       color: isaRed,
//       x: 127,
//       y: convertToYCoordinate(192, pageHeight, boldFont, 21),
//     },
//     brand: {
//       size: 16,
//       font: semiboldFont,
//       color: isaBlue,
//       x: 229,
//       y: convertToYCoordinate(232, pageHeight, semiboldFont, 16),
//     },
//     modelVersion: {
//       size: 16,
//       font: semiboldFont,
//       color: isaBlue,
//       x: 229,
//       y: convertToYCoordinate(261, pageHeight, semiboldFont, 16),
//     },
//     releaseYear: {
//       size: 16,
//       font: semiboldFont,
//       color: isaBlue,
//       x: 229,
//       y: convertToYCoordinate(290, pageHeight, semiboldFont, 16),
//     },
//     standard: {
//       size: 16,
//       font: semiboldFont,
//       color: isaBlue,
//       x: 229,
//       y: convertToYCoordinate(316, pageHeight, boldFont, 16),
//     },
//     productType: {
//       size: 16,
//       font: semiboldFont,
//       color: isaBlue,
//       x: 229,
//       y: convertToYCoordinate(350, pageHeight, boldFont, 16),
//     },
//     testingLab: {
//       size: 16,
//       font: semiboldFont,
//       color: isaBlue,
//       x: 229,
//       y: convertToYCoordinate(377, pageHeight, boldFont, 16),
//     },
//     testDate: {
//       size: 16,
//       font: semiboldFont,
//       color: isaBlue,
//       x: 229,
//       y: convertToYCoordinate(401, pageHeight, boldFont, 16),
//     },
//   };

//   for (const [key, value] of Object.entries(modifications)) {
//     page.drawText(data[key], {
//       ...value,
//     });
//   }

//   return pdfDoc;
// }
