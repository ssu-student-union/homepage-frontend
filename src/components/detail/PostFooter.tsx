import { DeleteButton } from '@/components/deprecated/Buttons/BoardActionButtons';
import { buttonVariants } from '@/components/ui/button.tsx';
import { List, Pencil } from '@phosphor-icons/react';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import { ArticleFooter } from '@/containers/new/ArticleFooter.tsx';
import { cn } from '@/libs/utils.ts';
import { Link, useNavigate } from 'react-router';

interface PostFooterProps {
  boardUrl: string;
  deletable?: boolean;
  editable?: boolean;
  editUrl?: string;
  className?: string;
  onDelete?: () => void;
}

export function PostFooter({ boardUrl, deletable, editable, editUrl, onDelete, className }: PostFooterProps) {
  const navigate = useNavigate();

  const handleListClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate(boardUrl);
    }
  };

  return (
    <ArticleFooter className={className}>
      <div className="flex w-full max-w-[1040px] justify-end gap-4">
        {deletable && <DeleteButton onClick={onDelete} />}
        {editable && (
          <Link className={cn(buttonVariants({ variant: 'list-edit' }), 'select-none')} to={editUrl || '#'}>
            <Pencil className="text-lg" />
            <p className="text-lg">편집</p>
          </Link>
        )}
        <a href={boardUrl} onClick={handleListClick} className={cn(buttonVariants({ variant: 'list-edit' }), 'select-none')}>
          <List className="text-lg" />
          <p className="text-lg">목록</p>
        </a>
      </div>
    </ArticleFooter>
  );
}

PostFooter.Skeleton = () => {
  return (
    <footer className="flex justify-center px-10 md:px-[72px] lg:px-[200px]">
      <div className="flex w-full max-w-[1040px] justify-end gap-4">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
      </div>
    </footer>
  );
};
