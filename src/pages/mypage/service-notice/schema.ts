import { z } from 'zod';
import { FileResponseSchema } from '@/schemas/post';
import { PostAclSchema } from '@/schemas/common';

//서비스공지사항에서 사용하는 게시물 정보의 원본 데이터
export type ServiceNoticePostResponse = z.input<typeof ServiceNoticePostSchema>;

export type ServiceNoticePost = z.output<typeof ServiceNoticePostSchema>;

export const ServiceNoticePostSchema = z.object({
  postId: z.number(),
  category: z.string().nullable(),
  authorName: z.string(),
  allowedAuthorities: z.array(PostAclSchema).nullable().default([]),
  title: z.string(),
  lastEditedAt: z
    .string()
    .transform((str) => new Date(str))
    .nullable(),
  isAuthor: z.boolean(),
  status: z.string(),
  createdAt: z.string().transform((str) => new Date(str)),
  fileResponseList: z.array(FileResponseSchema),
  content: z.string(),
});
