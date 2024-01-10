import type { Handler } from 'aws-lambda';

// import { generateCertificatePDF } from 'core/certificates/generators/certificateGenerator';
// import fs from 'fs';

const certificateTester: Handler = async (_event) => {
  // const { pdfBytes } = await generateCertificatePDF({
  //   certificateType: 'contest-organizer',
  //   certificateId: `contest_organizer_1`,
  //   subject: 'test',
  //   language: 'en',
  //   skipQRCode: true,
  // });
  // fs.writeFileSync('test-certificate.pdf', pdfBytes);
};

export const main = certificateTester;
