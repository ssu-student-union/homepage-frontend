import z from 'zod';

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
 * 인권조회게시판 목록에서 사용하는 각 게시물 정보입니다.
 */
export type HumanRightsPostSummary = z.infer<typeof HumanRightsPostSummarySchema>;

/**
 * 인권신고게시판 조회에서 사용하는 세부 정보가 포함된 게시물 정보입니다.
 */
export type HumanRightsPost = z.infer<typeof HumanRightsPostSchema>;

/**
 * 인권신고게시판 작성/수정 요청 시 사용하는 게시물 정보입니다.
 */
export type HumanRightsPostEditRequest = z.infer<typeof HumanRightsPostEditRequestSchema>;

/**
 * 인권신고게시판 댓글 정보입니다.
 */
export type HumanRightsComment = z.infer<typeof HumanRightsCommentSchema>;

// TODO: Move PostAcl Schema to global scope
/**
 * 권한 정보입니다.
 */
export type PostAcl = z.infer<typeof PostAclSchema>;

export const FileResponseSchema = z.object({
  postFileId: z.number(),
  fileName: z.string().min(1),
  fileUrl: z.string(),
  fileType: z.enum(['files', 'images']),
});

export const PostAclSchema = z.enum([
  'ALL_READ',
  'READ',
  'WRITE',
  'EDIT',
  'DELETE',
  'COMMENT',
  'DELETE_COMMENT',
  'REACTION',
]);

export const HumanRightsCategorySchema = z.enum(['접수대기', '접수완료'] as const);

export const HumanRightsPersonTypeSchema = z.enum(['REPORTER', 'VICTIM', 'ATTACKER'] as const);

export const HumanRightsPersonSchema = z.object({
  name: z.string().min(1),
  studentId: z.string().optional(),
  major: z.string().optional(),
  personType: HumanRightsPersonTypeSchema,
});

export const HumanRightsReporterSchema = HumanRightsPersonSchema.required().extend({
  phoneNumber: z.string().min(1),
  personType: z.literal('REPORTER'),
});

export const HumanRightsCommentSchema = z.object({
  id: z.number(),
  authorName: z.string(),
  studentId: z.string(),
  createdAt: z.string().transform((str) => new Date(str)),
  commentType: z.enum(['GENERAL', 'OFFICIAL']),
  lastEditedAt: z.coerce.date().nullable(),
  isDeleted: z.boolean(),
  isAuthor: z.boolean(),
  content: z.string().min(1),
});

export const HumanRightsPostSummarySchema = z.object({
  postId: z.number(),
  title: z.string().min(1),
  date: z.string().transform((str) => new Date(str)),
  category: HumanRightsCategorySchema,
  reportName: z.string().min(1),
  author: z.boolean(),
});

export const HumanRightsPostEditRequestSchema = z.object({
  title: z.string().min(1),
  categoryCode: HumanRightsCategorySchema,
  thumbNailImage: z.literal(null).default(null),
  isNotice: z.literal(false).default(false),
  postFileList: z.array(z.number()),
  relatedPeople: z.array(HumanRightsPersonSchema).nonempty(),
  content: z.string().min(1),
});

export const HumanRightsPostSchema = z.object({
  postId: z.number(),
  categoryName: HumanRightsCategorySchema,
  authorName: z.string(),
  title: z.string(),
  createdAt: z.string().transform((str) => new Date(str)),
  lastEditedAt: z
    .string()
    .transform((str) => new Date(str))
    .nullable(),
  isAuthor: z.boolean(),
  allowedAuthorities: z.array(PostAclSchema),
  fileResponseList: z.array(FileResponseSchema),
  officialCommentList: z.array(HumanRightsCommentSchema),
  rightsDetailList: z.array(HumanRightsPersonSchema),
  content: z.string(),
});

// TODO: Remove mock types
export type MockHumanRightsPerson = z.infer<typeof MockHumanRightsPersonSchema>;
export type MockHumanRightsReporter = z.infer<typeof MockHumanRightsReporterSchema>;
export type MockHumanRightsPostEditRequest = z.infer<typeof MockHumanRightsPostEditRequestSchema>;

export const MockHumanRightsPersonSchema = z.object({
  name: z.string().min(1),
  studentId: z.string().optional(),
  department: z.string().optional(),
});

export const MockHumanRightsReporterSchema = MockHumanRightsPersonSchema.required().extend({
  contact: z.string().min(1),
});

export const MockHumanRightsPostEditRequestSchema = z.object({
  postId: z.number().optional(),
  title: z.string().min(1),
  metadata: z.object({
    reporter: MockHumanRightsReporterSchema,
    victims: MockHumanRightsPersonSchema.array().min(1),
    invaders: MockHumanRightsPersonSchema.array().min(1),
  }),
  content: z.string().min(1),
  postFileList: z.number().array().default([]),
});
