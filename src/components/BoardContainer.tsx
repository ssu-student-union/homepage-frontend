import { ReactNode } from 'react';
import { Container } from '@/containers/new/Container';
import { cn } from '@/libs/utils';

interface BoardContainerProps {
  children: ReactNode;
  isEmpty: boolean;
  className?: string;
}

/**
 * 게시판 레이아웃을 구성하는 컨테이너 컴포넌트입니다.
 *
 * 게시글 목록, 필터 UI 등을 자식으로 감싸며,
 * 게시글이 없을 경우 "등록된 게시글이 없습니다." 메시지를 자동 출력합니다.
 *
 * @example
 * ```tsx
 * <BoardContainer isEmpty={!isLoading && posts.length === 0}>
 *   {isLoading
 *     ? Array.from({ length: 10 }).map((_, i) => <DataContentItem.Skeleton key={i} />)
 *     : posts.map((post) => (
 *         <DataContentItem
 *           key={post.postId}
 *           to={`/data/${post.postId}`}
 *           date={post.date}
 *           title={post.title}
 *           content={post.content}
 *           isNotice={post.isNotice}
 *           files={post.files}
 *         />
 *       ))}
 * </BoardContainer>
 * ```
 *
 * @param {boolean} isEmpty - 게시글이 비어 있는 상태 여부를 나타냅니다.
 * @param {ReactNode} children - 자식 요소들 (예: 게시글 목록, 필터, 검색 등)
 * @param {string} [className] - Container에 추가할 클래스
 */
export function BoardContainer({ children, isEmpty, className }: BoardContainerProps) {
  return (
    <Container className={cn('pt-0 max-md:px-0 md:pt-14', className)}>
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
