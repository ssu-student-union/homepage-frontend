import { DeleteButton } from '@/components/Buttons/BoardActionButtons.tsx';
import { buttonVariants } from '@/components/ui/button.tsx';
import { List, Pencil } from '@phosphor-icons/react';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import { ArticleFooter } from '@/containers/new/ArticleFooter.tsx';
import { cn } from '@/libs/utils.ts';

interface PostFooterProps {
  boardUrl: string;
  deletable?: boolean;
  editable?: boolean;
  editUrl?: string;
  className?: string;
  onDelete?: () => void;
}

export function PostFooter({ boardUrl, deletable, editable, editUrl, onDelete, className }: PostFooterProps) {
  return (
    <ArticleFooter className={className}>
      <div className="flex w-full max-w-[1040px] justify-end gap-4">
        {deletable && <DeleteButton onClick={onDelete} />}
        {editable && (
          <a className={cn(buttonVariants({ variant: 'List_Edit' }), 'select-none')} href={editUrl}>
            <Pencil className="text-lg" />
            <p className="text-lg">편집</p>
          </a>
        )}
        <a className={cn(buttonVariants({ variant: 'List_Edit' }), 'select-none')} href={boardUrl}>
          <List className="text-lg" />
          <p className="text-lg">목록</p>
        </a>
      </div>
    </ArticleFooter>
  );
}

PostFooter.Skeleton = () => {
  return (
    <footer className="flex justify-center px-10 md:px-[72px] lg:px-[200px] xl:px-[200px] xxl:px-[200px]">
      <div className="flex w-full max-w-[1040px] justify-end gap-4">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
      </div>
    </footer>
  );
};
