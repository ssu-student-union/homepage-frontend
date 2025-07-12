import { HeadLayout } from '@/template/HeadLayout.tsx';
import { BodyLayout } from '@/template/BodyLayout.tsx';
import { BoardSelector } from '@/components/deprecated/Board/BoardSelector';
import { PostContent } from '@/components/PostContent';
import { HumanRightsCategory } from '@/pages/human-rights/schema.ts';
import { Link, useSearchParams } from 'react-router';
import { SearchState } from '@/atoms/atom';
import { useSearchHumanRightsPosts } from '@/pages/human-rights/queries.ts';
import { useEffect, useMemo, useState } from 'react';
import { useAtom } from 'jotai';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { BoardHeader } from '@/components/BoardHeader';
import { Search } from '@/components/Search';
import { Pencil, SearchIcon } from 'lucide-react';
import { cn } from '@/libs/utils';
import LinkPagination from '@/components/LinkPagination';
import { buttonVariants } from '@/components/ui/button';
import { BoardFooter } from '@/components/BoardFooter';
import { BoardContainer } from '@/components/BoardContainer';
import { LinkCategories } from '@/components/LinkCategories';
import { buildHumanRightsCategories } from '@/pages/human-rights/const';
import { useTranslation } from 'react-i18next';

type SelectorCategory<T> = T extends T ? '전체' | T : never;

const categoryColors: { [category: string]: string } = {
  접수대기: 'text-gray-500',
  접수완료: 'text-primary',
} as const;

const ensureCategory = (str: string | null): SelectorCategory<HumanRightsCategory> => {
  if (str === '접수대기' || str === '접수완료') return str;
  return '전체';
};

const subtitle = (
  <p className="font-bold">
    해당 게시판을 통해 신고해주신 내용은 <span className="text-primary">학생인권위원회</span>에서 접수 및 처리됩니다.
  </p>
);

function PageSkeleton() {
  return (
    <>
      <HeadLayout title="인권신고게시판" subtitle={subtitle} searchHidden={true} />
      <BodyLayout.Skeleton>
        <BoardSelector.Skeleton />
        {Array.from(Array(10).keys()).map((_, i) => (
          <PostContent.Skeleton key={i} />
        ))}
      </BodyLayout.Skeleton>
    </>
  );
}

export function HumanRightsPage() {
  const { t } = useTranslation();
  /* Navigation function for write operation */
  // const navigate = useNavigate();
  /* Obtain query parameters */
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') ?? '1') || 1;
  const category = ensureCategory(searchParams.get('category'));

  /* Search state management */
  // TODO: Use search parameters instead of recoil state
  const [q] = useAtom(SearchState);

  const [filterOpen, setFilterOpen] = useState(false);

  /* Load data from Query */
  const { data, isLoading, isError, error } = useSearchHumanRightsPosts({
    q,
    page: page - 1,
    category: category === '전체' ? undefined : category,
  });

  // check wrong page params
  useEffect(() => {
    if (data && (page < 1 || page > data.pageInfo.totalPages)) {
      setSearchParams((prev) => {
        prev.delete('page');
        return prev;
      });
    }
  }, [data, page, setSearchParams]);

  const { totalPages } = useMemo(() => data?.pageInfo ?? { totalPages: 0 }, [data]);
  const authorities = useMemo(() => data?.allowedAuthorities ?? [], [data]);
  const writable = useMemo(() => authorities.includes('WRITE'), [authorities]);

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (!data || isError) {
    // TODO: 오류 발생 시 세부정보 제공
    console.log(error);
    return (
      <div className="mt-16 flex items-center justify-center">
        <p>오류가 발생하였습니다. 관리자에게 문의하십시오.</p>
      </div>
    );
  }

  /* Data preparation */
  const posts = data.postListResDto;

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
    <Collapsible open={filterOpen} onOpenChange={setFilterOpen}>
      <BoardHeader title="인권신고게시판" className="border-b-neutral-200 max-md:px-5 md:border-b">
        <Search className="hidden md:flex" onSearch={handleSearch} />
        <CollapsibleTrigger className="md:hidden">
          <SearchIcon className={cn('size-4 transition-colors', filterOpen && 'text-primary')} />
        </CollapsibleTrigger>
      </BoardHeader>
      <BoardContainer isEmpty={posts.length === 0}>
        <CollapsibleContent
          className={cn(
            'transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down',
            'border-b border-b-border max-md:px-4 md:hidden'
          )}
        >
          <div className="flex flex-col gap-2 py-2">
            <Search className="h-12 xl:hidden [&_button]:hidden" onSearch={handleSearch} />
          </div>
        </CollapsibleContent>
        <LinkCategories value={category} categories={buildHumanRightsCategories(t)} />
        <div className="border-t-black md:border-t">
          {isLoading
            ? Array.from(Array(10).keys()).map((_, i) => <PostContent.Skeleton key={i} />)
            : posts.map((post) => (
                <PostContent<HumanRightsCategory>
                  key={post.postId}
                  to={`/human-rights/${post.postId}`}
                  category={{ name: post.category, className: categoryColors[post.category] }}
                  date={post.date}
                  title={post.title}
                  author={post.reportName}
                />
              ))}
        </div>
      </BoardContainer>
      <BoardFooter>
        <div className="flex justify-center">
          <LinkPagination totalPages={totalPages} maxDisplay={7} page={page} />
        </div>
        <div className="flex justify-end">
          {writable && (
            <Link className={cn(buttonVariants({ variant: 'outline' }), 'gap-2')} to="/qna/edit">
              <Pencil className="size-4" />
              <p>글쓰기</p>
            </Link>
          )}
        </div>
      </BoardFooter>
    </Collapsible>
  );
}
