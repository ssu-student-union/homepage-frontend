import { ReactNode } from 'react';
import { Container } from '@/containers/new/Container';
import { cn } from '@/libs/utils';

interface BoardContainerProps {
  children: ReactNode;
  isEmpty: boolean;
}

export function BoardContainer({ children, isEmpty }: BoardContainerProps) {
  return (
    <Container className="pt-0 max-md:px-0 md:pt-14">
      <div className="flex flex-col gap-4">
        {children}
        {isEmpty && (
          <article className="flex items-center justify-center py-12 text-muted-foreground">
            등록된 게시글이 없습니다.
          </article>
        )}
      </div>
    </Container>
  );
}

interface CardProps {
  isLoading: boolean;
  skeleton: ReactNode[];
  items: ReactNode[];
  className?: string;
}

function Card({ isLoading, skeleton, items, className }: CardProps) {
  return <div className={cn(className)}>{isLoading ? skeleton : items}</div>;
}

BoardContainer.Card = Card;

{
  /* 
사용 예시입니다.(출처: 자료집페이지(src/pages/data/page.tsx))
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
  <BoardContainer.Card
    isLoading={isLoading}
    skeleton={Array.from({ length: 10 }).map((_, i) => (
      <DataContentItem.Skeleton key={i} />
    ))}
    items={posts.map((post) => (
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
  />
</BoardContainer> */
}
