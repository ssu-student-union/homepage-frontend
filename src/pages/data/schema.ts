import { z } from 'zod';

/**
 * 자료집 작성/수정 폼 작성 시 사용하는 게시물 정보입니다.
 */
export type DataPostEditForm = z.infer<ReturnType<typeof DataPostEditFormSchema>>;

/**
 * 동적으로 폼 스키마 생성
 * @param categoryKey - 카테고리 키
 */
export const DataPostEditFormSchema = (categoryKey: string[]) => {
  const DataCategorySchema = createDataCategorySchema(categoryKey);
  return z.object({
    postId: z.number().optional(),
    title: z.string().min(1).max(50),
    category: DataCategorySchema,
    isNotice: z.literal(false),
    postFileList: z.array(z.number()),
    content: z.string().min(1),
  });
};

/**
 * 동적으로 카테고리 스키마 생성 함수
 * @param categoryKey - 카테고리 키
 */
export const createDataCategorySchema = (categoryKey: string[]) => {
  const categories = categoryKey;
  if (!categories) {
    throw new Error();
  }
  return z.enum(categories as [string, ...string[]]);
};
