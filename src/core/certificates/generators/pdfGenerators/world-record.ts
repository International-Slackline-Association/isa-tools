// import PDF_EN from './templates/world-record-en.pdf';

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
//   recordType: string;
//   specs: string;
//   name: string;
//   category: string;
//   date: string;
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
//     name: {
//       size: 36,
//       font: berkshireFont,
//       color: black,
//       x: pageWidth / 2 - berkshireFont.widthOfTextAtSize(data.name, 36) / 2,
//       y: convertToYCoordinate(172, pageHeight, berkshireFont, 36),
//     },
//     recordType: {
//       size: 16,
//       font: boldFont,
//       color: black,
//       x: pageWidth / 2 - boldFont.widthOfTextAtSize(data.recordType, 16) / 2,
//       y: convertToYCoordinate(269, pageHeight, boldFont, 16),
//     },
//     specs: {
//       size: 16,
//       font: semiboldFont,
//       color: black,
//       x: 422,
//       y: convertToYCoordinate(312, pageHeight, semiboldFont, 16),
//     },
//     date: {
//       size: 16,
//       font: semiboldFont,
//       color: black,
//       x: 422,
//       y: convertToYCoordinate(343, pageHeight, semiboldFont, 16),
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
