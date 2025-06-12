import { ReactNode } from 'react';
import { ArticleFooter } from '@/containers/new/ArticleFooter';

export function BoardFooter({ children }: { children: ReactNode }) {
  return (
    <ArticleFooter className="mb-20">
      <div className="flex flex-col gap-9">
        <div className="grid grid-cols-3">
          <div />
          {children}
        </div>
      </div>
    </ArticleFooter>
  );
}

function BoardFooterPagination({ children }: { children: ReactNode }) {
  return <div className="flex justify-center">{children}</div>;
}

function BoardFooterLink({ children }: { children: ReactNode }) {
  return <div className="flex justify-end">{children}</div>;
}

BoardFooter.Pagination = BoardFooterPagination;
BoardFooter.Link = BoardFooterLink;

{
  /* 
사용 예시입니다.(출처: 자료집페이지(src/pages/data/page.tsx))
<BoardFooter>
  <BoardFooter.Pagination>
    <LinkPagination totalPages={10} maxDisplay={7} page={page} />
  </BoardFooter.Pagination>
  <BoardFooter.Link>
    {writable && (
      <Link className={cn(buttonVariants({ variant: 'outline' }), 'gap-2')} to="/data/edit">
        <Pencil className="size-4" />
        <p>글쓰기</p>
      </Link>
    )}
  </BoardFooter.Link>
</BoardFooter> */
}
