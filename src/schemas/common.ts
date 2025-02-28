import { z } from 'zod';

/**
 * 권한 정보입니다.
 */
export type PostAcl = z.infer<typeof PostAclSchema>;

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
