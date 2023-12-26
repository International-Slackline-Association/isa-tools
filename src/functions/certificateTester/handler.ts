import type { Handler } from 'aws-lambda';
import { certificateGenerator } from 'core/certificates/generators/certificateGenerator';

const certificateTester: Handler = async (event) => {
  await certificateGenerator.generate(
    {
      certificateType: 'instructor',
      certificateId: 'instructor_1',
      subject: 'test',
      language: 'en',
    },
    {
      writeToLocal: true,
    },
  );
};

export const main = certificateTester;
