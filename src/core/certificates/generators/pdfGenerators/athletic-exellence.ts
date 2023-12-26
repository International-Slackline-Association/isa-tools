// import PDF_EN from './templates/athlete-certificate-of-exellence-en.pdf';

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
//   representing: string;
//   year: string;
//   rank: string;
//   category: string;
//   discipline: string;
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
//       y: convertToYCoordinate(194, pageHeight, boldFont, 21),
//     },
//     representing: {
//       size: 16,
//       font: semiboldFont,
//       color: isaBlue,
//       x: 430,
//       y: convertToYCoordinate(227, pageHeight, semiboldFont, 16),
//     },
//     year: {
//       size: 16,
//       font: semiboldFont,
//       color: isaBlue,
//       x: 430,
//       y: convertToYCoordinate(247, pageHeight, semiboldFont, 16),
//     },
//     rank: {
//       size: 16,
//       font: semiboldFont,
//       color: isaBlue,
//       x: 430,
//       y: convertToYCoordinate(315, pageHeight, semiboldFont, 16),
//     },
//     category: {
//       size: 12,
//       font: semiboldFont,
//       color: isaBlue,
//       x: 430,
//       y: convertToYCoordinate(351, pageHeight, semiboldFont, 12),
//     },
//     discipline: {
//       size: 12,
//       font: semiboldFont,
//       color: isaBlue,
//       x: 430,
//       y: convertToYCoordinate(369, pageHeight, semiboldFont, 12),
//     },
//   };

//   for (const [key, value] of Object.entries(modifications)) {
//     page.drawText(data[key], {
//       ...value,
//     });
//   }

//   return pdfDoc;
// }
