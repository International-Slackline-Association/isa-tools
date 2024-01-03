import type { Handler } from 'aws-lambda';
import fs from 'fs';
import { generateCertificatePDF } from 'core/certificates/generators/certificateGenerator';

const certificateTester: Handler = async (event) => {
  const certificateType = event as any;

  const { pdfBytes } = await generateCertificatePDF({
    certificateType: 'instructor',
    certificateId: ``,
    subject: 'test',
    language: 'en',
    skipQRCode: true,
  });
  fs.writeFileSync('test-certificate.pdf', pdfBytes);
};

export const main = certificateTester;
