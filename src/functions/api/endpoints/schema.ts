import { z } from 'zod';

export const listCertificatesQueryParamsSchema = z
  .object({
    userId: z.string().optional(),
    email: z.string().optional(),
    certificateType: z.string().optional(),
  })
  .strip();

export type ListCertificatesQueryParams = z.infer<typeof listCertificatesQueryParamsSchema>;
