import z from 'zod';
import { FileResponseSchema, PostAclSchema } from '../human-rights/schema';

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
//질문 : zod를 사용하려면 무조건 위와 같이 input과 outpt을 구분하여 Response 타입과 사용하는 타입을 나누어야 하나요?

/**
 * 건의게시판 작성/수정 폼 작성 시 사용하는 게시물 정보
 */
export type SuggestPostWriteForm = z.infer<typeof SuggestWriteFormSchema>;

/**
 * 건의게시판 조회에서 사용하는 세부 정보가 포함된 게시물 원본 데이터
 */
export type SuggestPostResponse = z.input<typeof SuggestPostSchema>;

/**
 * 건의게시판 조회에서 사용하는 세부 정보가 포함된 게시물 정보
 */
export type SuggestPost = z.output<typeof SuggestPostSchema>;

/**
 * 건의게시판 생성/수정 요청 시 사용하는 게시물 정보
 */
export type SuggestPostEditRequest = z.output<typeof SuggestPostEditRequestSchema>;

/**
 * 건의게시판 댓글 원본 데이터
 */
export type SuggestCommentResponse = z.input<typeof SuggestCommentSchema>;

/**
 * 건의게시판 댓글 정보
 */
export type SuggestComment = z.output<typeof SuggestCommentSchema>;

export const SuggestCategorySchema = z.enum(['답변대기', '답변완료'] as const);

export const SuggestCommentSchema = z.object({
  id: z.number(),
  authorName: z.string(),
  content: z.string().min(1),
  commentType: z.enum(['GENERAL', 'OFFICIAL']),
  createdAt: z.string().transform((str) => new Date(str)),
  lastEditedAt: z.coerce.date().nullable(),
  isAuthor: z.boolean(),
});

export const SuggestPostSchema = z.object({
  postId: z.number(),
  category: SuggestCategorySchema.nullable().transform((str) => str ?? '답변대기'),
  authorName: z.string(),
  title: z.string(),
  content: z.string(),
  createdAt: z.string().transform((str) => new Date(str)),
  lastEditedAt: z.coerce.date().nullable(),
  isAuthor: z.boolean(),
  allowedAuthorities: z.array(PostAclSchema),
  fileResponseList: z.array(FileResponseSchema),
  officialCommentList: z.array(SuggestCommentSchema),
  studentId: z.number(),
});

export const SugNoticePostSummarySchema = z.object({
  postId: z.number(),
  title: z.string().min(1),
  content: z.string(),
  date: z.string().transform((str) => new Date(str)),
  category: SuggestCategorySchema.nullable().transform((str) => str ?? '답변대기'),
  author: z.string(),
  userId: z.number(),
});

export const SuggestWriteFormSchema = z.object({
  postId: z.number().optional(),
  title: z.string().min(1).max(50),
  category: SuggestCategorySchema,
  content: z.string().min(1),
  postFileList: z.array(z.number()),
});

export const SuggestPostEditRequestSchema = z.object({
  title: z.string().min(1).max(50),
  content: z.string(),
  category: SuggestCategorySchema.nullable().transform((str) => str ?? '답변대기'),
  thumbNailImage: z.string(),
  isNotice: z.literal(false),
  postFileList: z.array(z.number()),
});
