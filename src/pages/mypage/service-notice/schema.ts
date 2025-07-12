import { z } from 'zod';

export type ServiceNoticePostSummaryResponse = z.input<typeof ServiceNoticePostSummarySchema>;
export type ServiceNoticePostSummary = z.output<typeof ServiceNoticePostSummarySchema>;

export const ServiceNoticePostSummarySchema = z.object({
  postId: z.number().int(),
  title: z.string().min(1),
  date: z.string().transform((str) => new Date(str)),
  status: z.string().min(1),
});
