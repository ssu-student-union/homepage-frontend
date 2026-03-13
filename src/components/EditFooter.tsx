import { ArticleFooter } from '@/containers/new/ArticleFooter';
import { cn } from '@/libs/utils';
import { Button } from '@/components/ui/button';
import { useEditContext } from '@/containers/edit/useEditContext';
import { Loader2 } from 'lucide-react';
import { ReactNode } from 'react';

interface EditFooterProps {
  children: ReactNode;
  className?: string;
}

export function EditFooter({ children, className }: EditFooterProps) {
  const { form, submitForm, isImageProcessing, isFileUploadPending } = useEditContext();
  const { formState, handleSubmit } = form;
  const { errors } = formState;

  return (
    <ArticleFooter className={cn('pb-6', className)}>
      <Button
        variant="register"
        className="flex items-center justify-center gap-1 self-end px-2"
        disabled={Object.keys(errors).length > 0 || isImageProcessing || isFileUploadPending}
        onClick={handleSubmit(submitForm)}
      >
        <Loader2
          className={cn('animate-spin transition-all', isImageProcessing ? 'ml-0 opacity-100' : '-ml-7 opacity-0')}
        />
        <p>{children}</p>
      </Button>
    </ArticleFooter>
  );
}
