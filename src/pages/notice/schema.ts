import { PostAclSchema } from '@/schemas/common';
import { FileResponseSchema } from '@/schemas/post';
import { z } from 'zod';

/**
 * 공지사항게시판 조회에서 사용하는 세부 정보가 포함된 게시물 원본 데이터입니다.
 */
export type NoticePostResponse = z.input<typeof NoticePostSchema>;

/**
 * 공지사항게시판 조회에서 사용하는 세부 정보가 포함된 게시물 정보입니다.
 */
export type NoticePost = z.output<typeof NoticePostSchema>;

export const NoticePostSchema = z.object({
  status: z.string(),
  postId: z.number(),
  category: z.string().nullable(),
  authorName: z.string(),
  title: z.string(),
  content: z.string(),
  createdAt: z.string().transform((str) => new Date(str)),
  lastEditedAt: z
    .string()
    .transform((str) => new Date(str))
    .nullable(),
  isAuthor: z.boolean(),
  allowedAuthorities: z.array(PostAclSchema).nullable().default([]),
  fileResponseList: z.array(FileResponseSchema),
});
