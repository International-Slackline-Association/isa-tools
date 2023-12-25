import { z } from 'zod';

export const listCertificatesQueryParamsSchema = z
  .object({
    userId: z.string().uuid().optional(),
    email: z.string().email().optional(),
    certificateType: z.string().optional(),
  })
  .strip();

export type ListCertificatesQueryParams = z.infer<typeof listCertificatesQueryParamsSchema>;
