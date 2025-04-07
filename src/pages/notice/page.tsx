import { BoardHeader } from '@/components/BoardHeader';
import { BoardTabsList } from '@/components/BoardTabs';
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
import { Link, To, useSearchParams } from 'react-router';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

const buildCentralSubCategories: (t: TFunction) => { id: string; name: string; to: To }[] = (t) => [
  { id: '전체', name: t('board-selector.전체'), to: { search: '?category=중앙' } },
  { id: '총학생회', name: t('board-selector.총학생회'), to: { search: '?category=중앙&sub=총학생회' } },
  {
    id: '중앙운영위원회',
    name: t('board-selector.중앙운영위원회'),
    to: { search: '?category=중앙&sub=중앙운영위원회' },
  },
  {
    id: '중앙감사위원회',
    name: t('board-selector.중앙감사위원회'),
    to: { search: '?category=중앙&sub=중앙감사위원회' },
  },
  {
    id: '중앙선거관리위원회',
    name: t('board-selector.중앙선거관리위원회'),
    to: { search: '?category=중앙&sub=중앙선거관리위원회' },
  },
  { id: '동아리연합회', name: t('board-selector.동아리연합회'), to: { search: '?category=중앙&sub=동아리연합회' } },
];

const buildCollageSubCategories: (t: TFunction) => { id: string; name: string; to: To }[] = (t) => [
  { id: '전체', name: t('board-selector.전체'), to: { search: '?category=단과대' } },
  { id: '경영대학', name: t('board-selector.경영대학'), to: { search: '?category=단과대&sub=경영대학' } },
  { id: '경제통상대학', name: t('board-selector.경제통상대학'), to: { search: '?category=단과대&sub=경제통상대학' } },
  { id: '공과대학', name: t('board-selector.공과대학'), to: { search: '?category=단과대&sub=공과대학' } },
  { id: '법과대학', name: t('board-selector.법과대학'), to: { search: '?category=단과대&sub=법과대학' } },
  { id: '사회과학대학', name: t('board-selector.사회과학대학'), to: { search: '?category=단과대&sub=사회과학대학' } },
  { id: '인문대학', name: t('board-selector.인문대학'), to: { search: '?category=단과대&sub=인문대학' } },
  { id: '자연과학대학', name: t('board-selector.자연과학대학'), to: { search: '?category=단과대&sub=자연과학대학' } },
  { id: 'IT대학', name: t('board-selector.IT대학'), to: { search: '?category=단과대&sub=IT대학' } },
  {
    id: '융합특성화자유전공학부',
    name: '융합특성화자유전공학부',
    to: { search: '?category=단과대&sub=융합특성화자유전공학부' },
  },
];

const isToday = (date: string) => {
  const today = new Date();
  const postDate = new Date(date);
  return (
    today.getFullYear() === postDate.getFullYear() &&
    today.getMonth() === postDate.getMonth() &&
    today.getDate() === postDate.getDate()
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
        subtitle={
          isLoading ? (
            <Skeleton className="h-6 w-32" />
          ) : (
            <p>
              <span>오늘 총</span>
              <span className="text-primary"> {today}개의 </span>
              <span>공지가 올라왔어요!</span>
            </p>
          )
        }
        className="mt-16"
      >
        <Search className="hidden xl:flex" onSearch={handleSearch} />
      </BoardHeader>
      <Tabs value={category} className="w-full">
        <div className="max-md:hidden">
          <BoardTabsList>
            {/* TODO: Make BoardTabs with Link as a component */}
            <Link
              to="/notice?category=중앙"
              className={cn(
                buttonVariants({ variant: category === '중앙' ? 'default' : 'ghost', size: 'sm' }),
                'h-8',
                category !== '중앙' && 'text-neutral-600'
              )}
            >
              {t('board-navigator.중앙')}
            </Link>
            <Link
              to="/notice?category=단과대"
              className={cn(
                buttonVariants({ variant: category === '단과대' ? 'default' : 'ghost', size: 'sm' }),
                'h-8',
                category !== '단과대' && 'text-neutral-600'
              )}
            >
              {t('board-navigator.단과대')}
            </Link>
          </BoardTabsList>
        </div>

        <Container className="pt-0">
          <div className="flex flex-col gap-4">
            <TabsContent value="중앙">
              <LinkCategories value={subCategory} categories={centralSubCategories} />
            </TabsContent>
            <TabsContent value="단과대">
              <LinkCategories value={subCategory} categories={collageSubCategories} />
            </TabsContent>
            <div className="flex flex-wrap gap-7"></div>
            {isLoading ? (
              <CardLayout.Skeleton />
            ) : (
              <CardLayout>
                {data?.postListResDto?.map((post) => (
                  <PostCard key={post.postId} post={post} to={`/notice/${post.postId}`} />
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
                <LinkPagination
                  totalPages={totalPages}
                  maxDisplay={7}
                  page={page}
                  url={(page) => `/notice?category=${category}&sub=${subCategory}&page=${page}${q ? `&q=${q}` : ''}`}
                />
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
