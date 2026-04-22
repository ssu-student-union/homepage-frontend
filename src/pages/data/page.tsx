import { DataContentItem } from '@/pages/data/components/DataContentItem.tsx';
import { Link } from 'react-router';
import { useEffect, useMemo, useState } from 'react';
import { useSearchDataPosts } from '@/pages/data/hook/query/useSearchDataPost';
import { useDataSearchParams } from '@/pages/data/hook/useDataSearchParams';
import { BoardHeader } from '@/components/BoardHeader';
import { Search } from '@/components/Search';
import LinkPagination from '@/components/LinkPagination';
import { Pencil, SearchIcon } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/libs/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { CategoryPopover } from '@/pages/data/components/CategoryPopover';
import { BoardFooter } from '@/components/BoardFooter';
import { BoardContainer } from '@/components/BoardContainer';

export default function DataPage() {
  const { parsed, category, setCategory, handleSearch, resetParams } = useDataSearchParams();
  const { page, q, majorCategory, middleCategory, subCategory } = parsed;

  const [filterOpen, setFilterOpen] = useState(false);

  const { data, isLoading, isError, error } = useSearchDataPosts({
    q,
    page: page - 1,
    majorCategory: majorCategory ?? '',
    middleCategory: middleCategory ?? '',
    subCategory: subCategory ?? '',
  });

  useEffect(() => {
    if (data) {
      const { totalPages } = data.pageInfo;
      if (totalPages > 0 && (page < 1 || page > totalPages)) {
        resetParams(['page']);
      }
      if (totalPages === 0 && page !== 1) {
        resetParams(['page']);
      }
    }
  }, [data, page, resetParams]);

  const { totalPages } = useMemo(() => data?.pageInfo ?? { totalPages: 0 }, [data]);
  const posts = useMemo(() => data?.postListResDto ?? [], [data]);
  const authorities = useMemo(() => data?.allowedAuthorities ?? [], [data]);
  const writable = useMemo(() => authorities.includes('WRITE'), [authorities]);

  if (isError) {
    // TODO: 오류 발생 시 세부정보 제공
    console.log(error);
    return (
      <div className="mt-16 flex items-center justify-center">
        <p>오류가 발생하였습니다. 관리자에게 문의하십시오.</p>
      </div>
    );
  }

  return (
    <Collapsible open={filterOpen} onOpenChange={setFilterOpen}>
      <BoardHeader title="자료집" className="border-b-neutral-200 max-md:px-5 md:border-b">
        <Search className="hidden md:flex" onSearch={handleSearch} />
        <CollapsibleTrigger className="md:hidden">
          <SearchIcon className={cn('size-4 transition-colors', filterOpen && 'text-primary')} />
        </CollapsibleTrigger>
      </BoardHeader>
      <BoardContainer isEmpty={!isLoading && posts.length === 0}>
        <CollapsibleContent
          className={cn(
            'transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down',
            'border-b border-b-border max-md:px-4 md:hidden'
          )}
        >
          <div className="flex flex-col gap-2 py-2">
            <Search className="h-12 xl:hidden [&_button]:hidden" onSearch={handleSearch} />
            <CategoryPopover value={category} onChange={setCategory} />
          </div>
        </CollapsibleContent>
        <CategoryPopover className="hidden md:flex" value={category} onChange={setCategory} />
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => <DataContentItem.Skeleton key={i} />)
          : posts.map((post) => (
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
      </BoardContainer>
      <BoardFooter>
        <BoardFooter.CenterSlot>
          <LinkPagination totalPages={totalPages} maxDisplay={7} page={page} />
        </BoardFooter.CenterSlot>
        <BoardFooter.RightSlot>
          {writable && (
            <Link className={cn(buttonVariants({ variant: 'outline' }), 'gap-2')} to="/data/edit">
              <Pencil className="size-4" />
              <p>글쓰기</p>
            </Link>
          )}
        </BoardFooter.RightSlot>
      </BoardFooter>
    </Collapsible>
  );
}
