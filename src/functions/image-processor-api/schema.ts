import { z } from 'zod';

export const processImageSchema = z
  .object({
    input: z.object({
      s3: z
        .object({
          bucket: z.string().max(256),
          key: z.string().max(1024),
        })
        .optional(),
      raw: z
        .string()
        .max(1024 * 1024 * 5) // 5mb
        .optional(),
    }),
    output: z.object({
      s3: z
        .object({
          bucket: z.string().max(256),
          key: z.string().max(1024),
        })
        .optional(),
      raw: z.boolean().optional(),
    }),
    outputFormat: z.enum(['jpeg', 'png', 'webp']),
    width: z.number().positive(),
    height: z.number().positive(),
    quality: z.number().positive().max(100),
    aspectRatio: z
      .string()
      .regex(/^\d+:\d+$/)
      .optional(),
    fit: z.enum(['cover', 'contain', 'fill', 'inside', 'outside']),
    auto: z.string().optional(),
  })
  .strip();
export type ProcessImagePostBody = z.infer<typeof processImageSchema>;
