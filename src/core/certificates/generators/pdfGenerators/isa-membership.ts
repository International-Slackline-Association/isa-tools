// import PDF_EN from './templates/isa-member-en.pdf';

// import { PDFDocument } from 'pdf-lib';
// import {
//   convertToYCoordinate,
//   isaBlue,
//   isaRed,
//   loadPDFTemplate,
// } from 'app/components/MyCertificates/pdfGenerators/utils';
// import { PDFModificationsObject } from 'app/components/MyCertificates/pdfGenerators/types';

// interface Props {
//   membership: string;
//   name: string;
//   date: string;
//   location: string;
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
//     membership: {
//       size: 16,
//       font: semiboldFont,
//       color: isaBlue,
//       x: pageWidth / 2 - boldFont.widthOfTextAtSize(data.membership, 16) / 2,
//       y: convertToYCoordinate(208, pageHeight, boldFont, 21),
//     },
//     name: {
//       size: 21,
//       font: boldFont,
//       color: isaRed,
//       x: pageWidth / 2 - boldFont.widthOfTextAtSize(data.name, 21) / 2,
//       y: convertToYCoordinate(241, pageHeight, boldFont, 21),
//     },
//     date: {
//       size: 16,
//       font: boldFont,
//       color: isaBlue,
//       x: pageWidth / 2 - boldFont.widthOfTextAtSize(data.date, 16) / 2,
//       y: convertToYCoordinate(321, pageHeight, semiboldFont, 16),
//     },
//     location: {
//       size: 16,
//       font: boldFont,
//       color: isaBlue,
//       x: pageWidth / 2 - boldFont.widthOfTextAtSize(data.location, 16) / 2,
//       y: convertToYCoordinate(373, pageHeight, semiboldFont, 16),
//     },
//   };

//   for (const [key, value] of Object.entries(modifications)) {
//     page.drawText(data[key], {
//       ...value,
//     });
//   }
//   return pdfDoc;
// }
