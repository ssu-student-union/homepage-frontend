import { Spacing } from '@/components/Spacing';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useEffect, useMemo, useState } from 'react';
import { buildCentralSubCategories } from '@/pages/notice/const';
import { Category } from '@/components/Category';
import { useSearchNoticePosts } from '@/pages/notice/queries';
import { isToday } from '@/pages/notice/utils';
import { PostCard } from '@/components/PostCard';
import { useBreakpoints } from '@/hooks/useBreakpoints';

const breakpointPosts: Record<string, number> = {
  sm: 4,
  md: 2,
  lg: 3,
  xl: 4,
  xxl: 4,
  null: 4,
};

const NoticeSection = () => {
  const breakpoint = useBreakpoints();
  useEffect(() => console.log(breakpoint), [breakpoint]);
  const [subCategory, setSubCategory] = useState<string>('전체');
  const { t } = useTranslation();
  const centralSubCategories = useMemo(() => buildCentralSubCategories(t), [t]);
  const navigate = useNavigate();

  const { data, isLoading, error } = useSearchNoticePosts({
    take: 10,
    page: 0,
    groupCode: '중앙기구',
    ...(subCategory !== '전체' && { memberCode: subCategory }),
  });

  const today = useMemo(() => data?.postListResDto?.filter((post) => isToday(post.date))?.length ?? 0, [data]);

  const postLength = useMemo(() => breakpointPosts[breakpoint ?? 'null'], [breakpoint]);

  const posts = useMemo(() => {
    return data?.postListResDto?.slice(0, postLength) ?? [];
  }, [data?.postListResDto, postLength]);

  return (
    <section className="w-full">
      <div className="flex items-center">
        <h1 className="text-lg font-bold md:text-[2rem]">{t('introduction.공지사항')}</h1>
      </div>

      <Spacing size={12} direction="vertical" />
      <p className="text-sm font-bold text-gray-500 md:text-base">
        <span>오늘 </span>
        <span className="text-primary">{`${today}개`}</span>
        <span>{`의 공지가 올라왔어요!`}</span>
      </p>
      <Spacing size={21} direction="vertical" />
      <div className="flex flex-wrap gap-2">
        {centralSubCategories.map((sub) => (
          <Category key={sub.id} isActive={sub.id === subCategory} onClick={() => setSubCategory(sub.id)}>
            {sub.name}
          </Category>
        ))}
      </div>
      <Spacing size={24} direction="vertical" />
      <div className="flex flex-col gap-16 md:items-center">
        <div className="grid grid-cols-1 place-items-stretch gap-7 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {posts.map((post) => (
            <PostCard key={post.postId} post={post} to={`/notice/${post.postId}`} />
          ))}
          {isLoading && Array.from({ length: postLength }).map((_, index) => <PostCard.Skeleton key={index} />)}
        </div>
        {data && posts.length === 0 && (
          <p className="flex h-96 w-full items-center justify-center text-gray-600">등록된 게시물이 없습니다.</p>
        )}
        {error && <p className="flex h-96 w-full items-center justify-center text-destructive">오류가 발생했습니다.</p>}
        <Button
          onClick={() => {
            navigate(`/notice`);
          }}
          className="mx-auto h-[30px] w-[87px] rounded-full px-4 py-2 text-[12px] md:mx-0 md:size-fit md:text-[1rem]"
        >
          {t('main.더 알아보기')}
        </Button>
      </div>
    </section>
  );
};

export default NoticeSection;
