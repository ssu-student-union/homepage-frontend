import z from 'zod';

export type SuggestCategory = z.infer<typeof SuggestCategorySchema>;

export const SuggestCategorySchema = z.enum(['답변대기', '답변완료'] as const);
