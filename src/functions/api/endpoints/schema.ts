import { z } from 'zod';

export const listCertificatesQueryParamsSchema = z
  .object({
    userId: z.string().optional(),
    email: z.string().optional(),
    certificateType: z.string().optional(),
  })
  .strip();

export type ListCertificatesQueryParams = z.infer<typeof listCertificatesQueryParamsSchema>;

export const generateCertificatePostBodySchema = z
  .object({
    certificateType: z.string(),
    certificateId: z.string(),
    subject: z.string(),
    language: z.string(),
  })
  .strip();

export type GenerateCertificatePostBody = z.infer<typeof generateCertificatePostBodySchema>;
