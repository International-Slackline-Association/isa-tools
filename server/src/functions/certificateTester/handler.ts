import type { Handler } from 'aws-lambda';

// import { generateCertificatePDF } from 'core/certificates/generators/certificateGenerator';

const certificateTester: Handler = async (_event) => {
  // const certificateType = event as any;
  // const { pdfBytes } = await generateCertificatePDF({
  //   certificateType: 'isa-membership',
  //   certificateId: `isa_member_1`,
  //   subject: 'test',
  //   language: 'en',
  //   skipQRCode: true,
  // });
  // fs.writeFileSync('test-certificate.pdf', pdfBytes);
};

export const main = certificateTester;
