import { z } from 'zod';
import { FileResponseSchema } from '@/schemas/post';
import { PostAclSchema } from '@/schemas/common';

/**
 * 자료집 목록에서 사용하는 각 게시물 정보의 원본 데이터입니다.
 */
export type DataPostSummaryResponse = z.input<typeof DataPostSummarySchema>;

/**
 * 자료집 목록에서 사용하는 각 게시물 정보입니다.
 */
export type DataPostSummary = z.output<typeof DataPostSummarySchema>;

/**
 * 인권신고게시판 조회에서 사용하는 세부 정보가 포함된 게시물 원본 데이터입니다.
 */
export type DataPostResponse = z.input<typeof DataPostSchema>;

/**
 * 인권신고게시판 조회에서 사용하는 세부 정보가 포함된 게시물 정보입니다.
 */
export type DataPost = z.output<typeof DataPostSchema>;

/**
 * 자료집 작성/수정 폼 작성 시 사용하는 게시물 정보입니다.
 */
export type DataPostEditRequest = z.output<typeof DataPostEditFormSchema>;
export type DataPostEditForm = z.infer<typeof DataPostEditFormSchema>;

export const DataPostEditFormSchema = z.object({
  postId: z.number().optional(),
  title: z.string().min(1).max(50),
  category: z.preprocess((val) => {
    if (typeof val === 'string') {
      return val.replace(/ /g, '_').replace(/·/g, '');
    }
    return val;
  }, z.string().min(1)),
  fileCategory: z.preprocess((val) => {
    if (typeof val === 'string') {
      return val.replace(/ /g, '_').replace(/·/g, '');
    }
    return val;
  }, z.string().min(1)),
  content: z.string().min(1),
  postFileList: z.array(z.number()),
  isNotice: z.boolean(),
});

export const DataPostSummarySchema = z.object({
  category: z.string().nullable(),
  content: z.string(),
  date: z.string().transform((str) => new Date(str)),
  files: z.array(FileResponseSchema).default([]),
  isNotice: z.boolean(),
  postId: z.number().int(),
  title: z.string().min(1),
});

export const DataPostSchema = z.object({
  allowedAuthorities: z.array(PostAclSchema).nullable().default([]),
  authorName: z.string(),
  category: z.string().nullable(),
  content: z.string(),
  createdAt: z.string().transform((str) => new Date(str)),
  fileResponseList: z.array(FileResponseSchema),
  isAuthor: z.boolean(),
  lastEditedAt: z
    .string()
    .transform((str) => new Date(str))
    .nullable(),
  postId: z.number(),
  title: z.string(),
});
