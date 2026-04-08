import { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

import { ArticleFooter } from '@/containers/new/ArticleFooter';
import { Button } from '@/components/ui/button';
import { cn } from '@/libs/utils';

interface EditFooterProps {
  onSubmit: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
  children?: ReactNode;
}

export function EditFooter({ onSubmit, disabled = false, isLoading = false, className, children = '등록' }: EditFooterProps) {
  return (
    <ArticleFooter className={cn('pb-6', className)}>
      <Button
        variant="register"
        className="flex items-center justify-center gap-1 self-end px-2"
        disabled={disabled}
        onClick={onSubmit}
      >
        <Loader2
          className={cn('animate-spin transition-all', isLoading ? 'ml-0 opacity-100' : '-ml-7 opacity-0')}
        />
        <p>{children}</p>
      </Button>
    </ArticleFooter>
  );
}
