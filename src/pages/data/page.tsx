import SortOptions from '@/pages/data/container/SortOptions.tsx';
import { DataContentItem } from '@/pages/data/components/DataContentItem.tsx';
import { Link, useSearchParams } from 'react-router';
import { useEffect, useMemo, useState } from 'react';
import { useDataCategory } from './hook/utils/useDataCategory';
import { useSearchDataPosts } from '@/pages/data/hook/query/useSearchDataPost';
import { BoardHeader } from '@/components/BoardHeader';
import { Search } from '@/components/Search';
import { Container } from '@/containers/new/Container';
import { ArticleFooter } from '@/containers/new/ArticleFooter';
import LinkPagination from '@/components/LinkPagination';
import { Pencil, SlidersHorizontal } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/libs/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export default function DataPage() {
  /* Obtain query parameters */
  const [searchParams, setSearchParams] = useSearchParams();
  const page = useMemo(() => parseInt(searchParams.get('page') ?? '1') || 1, [searchParams]);
  const q = useMemo(() => searchParams.get('q') ?? '', [searchParams]);

  /* 카테고리 분류 */
  const { majorCategory, middleCategory, subCategory, setMajor, setMiddle, setSub } = useDataCategory();
  const [filterOpen, setFilterOpen] = useState(false);

  /* Load data from Query */
  const { data, isLoading, isError, error } = useSearchDataPosts({
    q,
    page: page - 1,
    majorCategory: majorCategory ?? '',
    middleCategory: middleCategory ?? '',
    subCategory: subCategory ?? '',
  });

  // check wrong page params
  useEffect(() => {
    if (data && (page < 1 || page > data.pageInfo.totalPages)) {
      setSearchParams((prev) => {
        prev.delete('page');
        return prev;
      });
    }
  }, [data, page, majorCategory, middleCategory, subCategory, setSearchParams]);

  /* Data preparation */
  const { totalPages } = useMemo(() => data?.pageInfo ?? { totalPages: 0 }, [data]);
  const posts = useMemo(() => data?.postListResDto ?? [], [data]);
  const authorities = useMemo(() => data?.allowedAuthorities ?? [], [data]);
  const writable = useMemo(() => authorities.includes('WRITE'), [authorities]);

  if (isLoading) {
    return (
      <>
        <BoardHeader title="자료집" className="border-b-neutral-200 max-md:px-5 md:border-b" />
        <Container className="pt-0 max-md:px-0 md:pt-14">
          <div className="flex flex-col gap-5">
            <SortOptions
              className="mb-9 hidden md:flex"
              majorCategory={majorCategory || ''}
              middleCategory={middleCategory || ''}
              subCategory={subCategory || ''}
              onMajorChange={setMajor}
              onMiddleChange={setMiddle}
              onMinorChange={setSub}
            />
            {Array.from(Array(10).keys()).map((_, i) => (
              <DataContentItem.Skeleton key={i} />
            ))}
          </div>
        </Container>
      </>
    );
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
      <Collapsible open={filterOpen} onOpenChange={setFilterOpen}>
        <BoardHeader title="자료집" className="border-b-neutral-200 max-md:px-5 md:border-b">
          <Search className="hidden xl:flex" onSearch={handleSearch} />
          <CollapsibleTrigger className="md:hidden">
            <SlidersHorizontal className="size-4" />
          </CollapsibleTrigger>
        </BoardHeader>
        <Container className="pt-0 max-md:px-0 md:pt-14">
          <div className="flex flex-col gap-5">
            <CollapsibleContent className="max-md:px-4">
              <SortOptions
                majorCategory={majorCategory || ''}
                middleCategory={middleCategory || ''}
                subCategory={subCategory || ''}
                onMajorChange={setMajor}
                onMiddleChange={setMiddle}
                onMinorChange={setSub}
              />
            </CollapsibleContent>
            <SortOptions
              className="mb-9 hidden md:flex"
              majorCategory={majorCategory || ''}
              middleCategory={middleCategory || ''}
              subCategory={subCategory || ''}
              onMajorChange={setMajor}
              onMiddleChange={setMiddle}
              onMinorChange={setSub}
            />
            <div className="border-t-black md:border-t">
              {posts.map((post) => (
                <DataContentItem
                  key={post.postId}
                  to={`/data/${post.postId}`}
                  date={post.date}
                  title={post.title}
                  content={post.content}
                  isNotice={post.isNotice}
                  files={post.files}
                />
              ))}
            </div>
            {posts.length === 0 && (
              <article className="flex items-center justify-center py-12">등록된 게시글이 없습니다.</article>
            )}
          </div>
        </Container>
      </Collapsible>

      <ArticleFooter className="mb-20">
        <div className="flex flex-col gap-9">
          <div className="grid grid-cols-3">
            <div></div>
            <div className="flex justify-center">
              <LinkPagination totalPages={totalPages} maxDisplay={7} page={page} />
            </div>
            <div className="flex justify-end">
              {writable && (
                <Link className={cn(buttonVariants({ variant: 'outline' }), 'gap-2')} to="/data/edit">
                  <Pencil className="size-4" />
                  <p>글쓰기</p>
                </Link>
              )}
            </div>
          </div>
          <Search className="xl:hidden" onSearch={handleSearch} />
        </div>
      </ArticleFooter>
    </>
  );
}
