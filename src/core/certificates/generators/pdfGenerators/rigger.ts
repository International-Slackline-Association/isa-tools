// import PDF_EN from './templates/rigger-en.pdf';

// import { PDFDocument } from 'pdf-lib';
// import {
//   black,
//   convertToYCoordinate,
//   embedQRCodeToPDF,
//   isaBlue,
//   isaRed,
//   loadPDFTemplate,
// } from 'app/components/MyCertificates/pdfGenerators/utils';
// import { PDFModificationsObject } from 'app/components/MyCertificates/pdfGenerators/types';

// interface Props {
//   fullname: string;
//   level: string;
//   startDate: string;
//   endDate: string;
// }

// export const PDFs = { en: PDF_EN };

// export async function generate(
//   language: string,
//   data: Props,
//   qrCodeUrl?: string,
// ): Promise<PDFDocument> {
//   const blankPDF = PDFs[language] || PDFs.en;

//   const {
//     boldFont,
//     page,
//     pageHeight,
//     pageWidth,
//     pdfDoc,
//     semiboldFont,
//     berkshireFont,
//   } = await loadPDFTemplate(blankPDF);

//   const modifications: PDFModificationsObject<Props> = {
//     fullname: {
//       size: 36,
//       font: berkshireFont,
//       color: black,
//       x: pageWidth / 2 - berkshireFont.widthOfTextAtSize(data.fullname, 36) / 2,
//       y: convertToYCoordinate(172, pageHeight, berkshireFont, 36),
//     },
//     level: {
//       size: 21,
//       font: boldFont,
//       color: black,
//       x: pageWidth / 2 - boldFont.widthOfTextAtSize(data.level, 21) / 2,
//       y: convertToYCoordinate(290, pageHeight, boldFont, 21),
//     },
//     startDate: {
//       size: 12,
//       font: semiboldFont,
//       color: black,
//       x: 401,
//       y: convertToYCoordinate(388, pageHeight, semiboldFont, 12),
//     },
//     endDate: {
//       size: 12,
//       font: semiboldFont,
//       color: black,
//       x: 570,
//       y: convertToYCoordinate(388, pageHeight, semiboldFont, 12),
//     },
//   };

//   for (const [key, value] of Object.entries(modifications)) {
//     page.drawText(data[key], {
//       ...value,
//     });
//   }

//   if (qrCodeUrl) {
//     await embedQRCodeToPDF(pdfDoc, qrCodeUrl, {
//       x: 696,
//       y: 438,
//     });
//   }

//   return pdfDoc;
// }
