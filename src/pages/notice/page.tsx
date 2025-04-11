import { BoardHeader } from '@/components/BoardHeader';
import { BoardTabsList, BoardTabsQueryLink } from '@/components/BoardTabs';
import { PostCard } from '@/components/PostCard';
import { CardLayout } from '@/components/layouts/CardLayout';
import { LinkCategories } from '@/components/LinkCategories';
import LinkPagination from '@/components/LinkPagination';
import { Search } from '@/components/Search';
import { buttonVariants } from '@/components/ui/button';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { ArticleFooter } from '@/containers/new/ArticleFooter';
import { Container } from '@/containers/new/Container';
import { cn } from '@/libs/utils';
import { useSearchNoticePosts } from '@/pages/notice/queries';
import { Pencil } from 'lucide-react';
import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslation } from 'react-i18next';
import { buildCentralSubCategories, buildCollageSubCategories } from '@/pages/notice/const';
import { isToday } from '@/pages/notice/utils';

const TodaySubtitle = ({ count }: { count: number }) => {
  return (
    <p>
      <span>오늘 총</span>
      <span className="text-primary"> {count}개의 </span>
      <span>공지가 올라왔어요!</span>
    </p>
  );
};

export function NoticePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = useMemo(() => searchParams.get('category') ?? '중앙', [searchParams]);
  const subCategory = useMemo(() => searchParams.get('sub') ?? '전체', [searchParams]);
  const page = useMemo(() => parseInt(searchParams.get('page') || '1') || 1, [searchParams]);
  const q = useMemo(() => searchParams.get('q') ?? undefined, [searchParams]);
  const { t } = useTranslation();

  const centralSubCategories = useMemo(() => buildCentralSubCategories(t), [t]);
  const collageSubCategories = useMemo(() => buildCollageSubCategories(t), [t]);

  const { data, isLoading } = useSearchNoticePosts({
    q,
    page: page - 1,
    take: 16,
    groupCode: category === '중앙' ? '중앙기구' : '단과대학생회',
    memberCode: subCategory === '전체' ? '' : subCategory,
  });
  const today = useMemo(() => data?.postListResDto?.filter((post) => isToday(post.date))?.length ?? 0, [data]);

  const totalPages = useMemo(() => data?.pageInfo.totalPages ?? 0, [data]);
  const authorities = useMemo(() => data?.allowedAuthorities ?? [], [data]);
  const writable = useMemo(() => authorities.includes('WRITE'), [authorities]);

  const handleSearch = (value: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev.toString());
      if (value) {
        newParams.set('q', value);
      } else {
        newParams.delete('q');
      }
      return newParams;
    });
  };

  return (
    <>
      <BoardHeader
        title={category === '중앙' ? t('introduction.중앙 공지사항') : t('introduction.단과대 공지사항')}
        subtitle={isLoading ? <Skeleton className="h-6 w-32" /> : <TodaySubtitle count={today} />}
      >
        <Search className="hidden xl:flex" onSearch={handleSearch} />
      </BoardHeader>
      <Tabs value={category} className="w-full">
        <div className="max-md:hidden">
          <BoardTabsList>
            {/* TODO: Make BoardTabs with Link as a component */}
            <BoardTabsQueryLink query="category" value="중앙">
              {t('board-navigator.중앙')}
            </BoardTabsQueryLink>
            <BoardTabsQueryLink query="category" value="단과대">
              {t('board-navigator.단과대')}
            </BoardTabsQueryLink>
          </BoardTabsList>
        </div>

        <Container className="pt-0 max-md:px-0">
          <div className="flex flex-col gap-4">
            <div className="px-4">
              <TabsContent value="중앙">
                <LinkCategories value={subCategory} categories={centralSubCategories} />
              </TabsContent>
              <TabsContent value="단과대">
                <LinkCategories value={subCategory} categories={collageSubCategories} />
              </TabsContent>
            </div>
            {isLoading ? (
              <CardLayout.Skeleton />
            ) : (
              <CardLayout>
                {data?.postListResDto?.map((post) => (
                  <PostCard key={post.postId} post={post} to={`/notice/${post.postId}`} className="max-md:px-4" />
                ))}
              </CardLayout>
            )}
          </div>
        </Container>
        <ArticleFooter className="mb-20">
          <div className="flex flex-col gap-9">
            <div className="grid grid-cols-3">
              <div></div>
              <div className="flex justify-center">
                <LinkPagination totalPages={totalPages} maxDisplay={7} page={page} />
              </div>
              <div className="flex justify-end">
                {writable && (
                  <Link className={cn(buttonVariants({ variant: 'outline' }), 'gap-2')} to="/notice/edit">
                    <Pencil className="size-4" />
                    <p>글쓰기</p>
                  </Link>
                )}
              </div>
            </div>
            <Search className="xl:hidden" onSearch={handleSearch} />
          </div>
        </ArticleFooter>
      </Tabs>
    </>
  );
}
