import z from 'zod';
import { FileResponseSchema } from '@/schemas/post';
import { PostAclSchema } from '@/schemas/common';

/**
 * 인권조회게시판 카테고리입니다.
 */
export type HumanRightsCategory = z.infer<typeof HumanRightsCategorySchema>;

/**
 * 인권조회게시판 대상자 분류입니다.
 */
export type HumanRightsPersonType = z.infer<typeof HumanRightsPersonTypeSchema>;

/**
 * 인권조회게시판 대상자의 기본 타입입니다. `personType`이 `REPORTER` 일 경우 HumanRightsReporter 타입을 사용하세요.
 */
export type HumanRightsPerson = z.infer<typeof HumanRightsPersonSchema>;

/**
 * 인권조회게시판 제보자 타입입니다.
 */
export type HumanRightsReporter = z.infer<typeof HumanRightsReporterSchema>;

// Type inconsistency between Post-related types; cannot set a relation between types
/**
 * 인권조회게시판 목록에서 사용하는 각 게시물 정보의 원본 데이터입니다.
 */
export type HumanRightsPostSummaryResponse = z.input<typeof HumanRightsPostSummarySchema>;
/**
 * 인권조회게시판 목록에서 사용하는 각 게시물 정보입니다.
 */
export type HumanRightsPostSummary = z.output<typeof HumanRightsPostSummarySchema>;

/**
 * 인권신고게시판 조회에서 사용하는 세부 정보가 포함된 게시물 원본 데이터입니다.
 */
export type HumanRightsPostResponse = z.input<typeof HumanRightsPostSchema>;

/**
 * 인권신고게시판 조회에서 사용하는 세부 정보가 포함된 게시물 정보입니다.
 */
export type HumanRightsPost = z.output<typeof HumanRightsPostSchema>;

/**
 * 인권신고게시판 작성/수정 폼 작성 시 사용하는 게시물 정보입니다.
 */
export type HumanRightsPostEditForm = z.infer<typeof HumanRightsPostEditFormSchema>;

/**
 * 인권신고게시판 작성/수정 요청 시 사용하는 게시물 정보입니다.
 */
export type HumanRightsPostEditRequest = z.output<typeof HumanRightsPostEditRequestSchema>;

/**
 * 인권신고게시판 댓글 원본 데이터입니다.
 */
export type HumanRightsCommentResponse = z.input<typeof HumanRightsCommentSchema>;
/**
 * 인권신고게시판 댓글 정보입니다.
 */
export type HumanRightsComment = z.output<typeof HumanRightsCommentSchema>;

export const HumanRightsCategorySchema = z.enum(['접수대기', '접수완료'] as const);

export const HumanRightsPersonTypeSchema = z.enum(['REPORTER', 'VICTIM', 'ATTACKER'] as const);

export const HumanRightsPersonSchema = z.object({
  name: z.string().min(1),
  studentId: z.string(),
  major: z.string(),
  phoneNumber: z.string().nullable().optional(),
  personType: HumanRightsPersonTypeSchema,
});

export const HumanRightsReporterSchema = HumanRightsPersonSchema.extend({
  phoneNumber: z.string().min(1),
  personType: z.literal('REPORTER').default('REPORTER'),
});

export const HumanRightsCommentSchema = z.object({
  id: z.number(),
  authorName: z.string(),
  studentId: z.string().optional(),
  createdAt: z.string().transform((str) => new Date(str)),
  commentType: z.enum(['GENERAL', 'OFFICIAL']),
  lastEditedAt: z.coerce.date().nullable(),
  isDeleted: z.boolean().optional().default(false),
  isAuthor: z.boolean(),
  content: z.string().min(1),
});

export const HumanRightsPostSchema = z.object({
  postId: z.number(),
  category: HumanRightsCategorySchema.nullable().transform((str) => str ?? '접수대기'),
  authorName: z.string(),
  title: z.string(),
  createdAt: z.string().transform((str) => new Date(str)),
  lastEditedAt: z
    .string()
    .transform((str) => new Date(str))
    .nullable(),
  isAuthor: z.boolean(),
  allowedAuthorities: z.array(PostAclSchema),
  postFileList: z.array(FileResponseSchema),
  officialCommentList: z.array(HumanRightsCommentSchema),
  rightsDetailList: z.array(HumanRightsPersonSchema.or(HumanRightsReporterSchema)),
  content: z.string(),
});

export const HumanRightsPostSummarySchema = z.object({
  postId: z.number(),
  title: z.string().min(1),
  date: z.coerce.date(), //z.string().transform((str) => new Date(str)),
  category: HumanRightsCategorySchema.nullable().transform((str) => str ?? '접수대기'),
  reportName: z.string().min(1),
});

export const HumanRightsPostEditFormSchema = z.object({
  postId: z.number().optional(),
  title: z.string().min(1).max(50),
  category: HumanRightsCategorySchema,
  isNotice: z.literal(false),
  postFileList: z.array(z.number()),
  rightsDetailList: z.object({
    reporter: HumanRightsReporterSchema,
    victims: z.array(HumanRightsPersonSchema.extend({ personType: z.literal('VICTIM').default('VICTIM') })).nonempty(),
    attackers: z
      .array(HumanRightsPersonSchema.extend({ personType: z.literal('ATTACKER').default('ATTACKER') }))
      .nonempty(),
  }),
  content: z.string().min(1),
});

export const HumanRightsPostEditRequestSchema = HumanRightsPostEditFormSchema.omit({ postId: true }).extend({
  rightsDetailList: z
    .object({
      reporter: HumanRightsReporterSchema,
      victims: z.array(HumanRightsPersonSchema.extend({ personType: z.literal('VICTIM') })).nonempty(),
      attackers: z.array(HumanRightsPersonSchema.extend({ personType: z.literal('ATTACKER') })).nonempty(),
    })
    .transform((obj) => [obj.reporter, ...obj.victims, ...obj.attackers]),
});
