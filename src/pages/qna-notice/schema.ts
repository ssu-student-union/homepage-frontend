import { z } from 'zod';

export type QnaNoticeCategory = z.infer<typeof QnaNoticeCategorySchema>;

export const QnaNoticeCategorySchema = z.enum(['답변대기', '답변완료']);
