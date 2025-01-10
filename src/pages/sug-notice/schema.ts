import z from 'zod';

export const SuggestCategorySchema = z.enum(['답변대기', '답변완료'] as const);

export type SuggestCategory = z.infer<typeof SuggestCategorySchema>;

/**
 * 건의게시판 목록에서 사용하는 각 게시물 정보의 원본 데이터
 */
export type SugNoticePostSummaryResponse = z.input<typeof SugNoticePostSummarySchema>;
//질문 : 스키마를 만들때, Summary는 어떤 의미로 적어 넣었는지

/**
 * 건의게시판 목록에서 사용하는 각 게시물 정보
 */
export type SugNoticePostsSummary = z.output<typeof SugNoticePostSummarySchema>;
//질문 : zod를 사용하려면 무조건 위와 같으 input과 outpt을 구분하여 Response 타입과 사용하는 타입을 나누어야 하나요?

export const SugNoticePostSummarySchema = z.object({
  postId: z.number(),
  title: z.string().min(1),
  content: z.string(),
  date: z.string().transform((str) => new Date(str)),
  category: SuggestCategorySchema.nullable().transform((str) => str ?? '답변대기'),
  author: z.string(),
  userId: z.number(),
});
