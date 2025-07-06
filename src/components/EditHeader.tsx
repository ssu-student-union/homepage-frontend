import { ArticleHeader } from '@/containers/new/ArticleHeader';
import { cn } from '@/libs/utils';
import { User } from 'lucide-react';
import { ReactNode } from 'react';

/**
 * 게시글 작성/수정 화면에서 사용하는 헤더 컴포넌트입니다.
 *
 * `EditHeader.Title`, `EditHeader.Member` 등의 하위 컴포넌트를 children으로 조합하여 사용합니다.
 * 작성자 정보가 없는 게시판의 경우 `Title`만 사용할 수도 있으며, 필요 시 버튼 등을 추가로 삽입할 수도 있습니다.
 *
 * @example 기본 사용
 * ```tsx
 * <EditHeader>
 *   <EditHeader.Title>게시글 작성</EditHeader.Title>
 *   <EditHeader.Member>작성자 이름</EditHeader.Member>
 * </EditHeader>
 * ```
 *
 * @example 작성자 없는 경우
 * ```tsx
 * <EditHeader>
 *   <EditHeader.Title>자료 등록</EditHeader.Title>
 * </EditHeader>
 * ```
 */

interface EditHeaderRootProps {
  children: ReactNode;
  className?: string;
}

function EditHeaderRoot({ children, className }: EditHeaderRootProps) {
  return <ArticleHeader className={cn('py-4 md:py-6 xl:pt-16', className)}>{children}</ArticleHeader>;
}

function EditHeaderTitle({ children }: { children: ReactNode }) {
  return <h1 className="text-2xl font-bold">{children}</h1>;
}

function EditHeaderMember({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground md:text-base">
      <User className="size-4" />
      <span>{children}</span>
    </div>
  );
}

export const EditHeader = Object.assign(EditHeaderRoot, {
  Title: EditHeaderTitle,
  Member: EditHeaderMember,
});
