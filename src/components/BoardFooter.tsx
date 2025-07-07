import { ReactNode } from 'react';
import { ArticleFooter } from '@/containers/new/ArticleFooter';

/**
 * 게시판 하단 구성 요소를 담는 컨테이너입니다.
 *
 * 기본적으로 가운데와 오른쪽 슬롯을 제공하며,
 * 페이지네이션, 글쓰기 버튼 등의 요소를 배치할 수 있습니다.
 *
 * @example
 * ```tsx
 * <BoardFooter>
 *   <BoardFooter.CenterSlot>
 *     <LinkPagination totalPages={10} maxDisplay={7} page={page} />
 *   </BoardFooter.CenterSlot>
 *   <BoardFooter.RightSlot>
 *     {writable && (
 *       <Link
 *         to="/data/edit"
 *         className={cn(buttonVariants({ variant: 'outline' }), 'gap-2')}
 *       >
 *         <Pencil className="size-4" />
 *         <span>글쓰기</span>
 *       </Link>
 *     )}
 *   </BoardFooter.RightSlot>
 * </BoardFooter>
 * ```
 */
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

function BoardFooterCenterSlot({ children }: { children: ReactNode }) {
  return <div className="flex justify-center">{children}</div>;
}

function BoardFooterRightSlot({ children }: { children: ReactNode }) {
  return <div className="flex justify-end">{children}</div>;
}

BoardFooter.CenterSlot = BoardFooterCenterSlot;
BoardFooter.RightSlot = BoardFooterRightSlot;
