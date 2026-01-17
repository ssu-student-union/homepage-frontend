import type { UseFormReturn } from 'react-hook-form';

import { Container } from '@/containers/new/Container';
import { PostHeader } from '@/components/detail/PostHeader';
import { PostFooter } from '@/components/detail/PostFooter';

import { cn } from '@/libs/utils';
import { EditContext, EditContextType } from './useEditContext';
import { UseContentEditorReturn } from '@/hooks/useContentEditor';
import { PostFile } from '@/components/edit/FileInput';

interface EditProviderProps<T extends Record<string, unknown>> {
  postId: string;

  form: UseFormReturn<T>;

  register: UseContentEditorReturn['register'];
  isImageProcessing: UseContentEditorReturn['isImageProcessing'];
  processImages: UseContentEditorReturn['processImages'];

  files: PostFile[];
  isFileUploadPending: boolean;
  handleFilesChange(newFiles: PostFile[]): void;
  handleContentChange(): void;
  handleContentBlur(): void;

  submitForm(formData: T): Promise<void>;

  children: React.ReactNode;
  className?: string;
}

export function EditPage<T extends Record<string, unknown>>({
  postId,
  form,

  register,
  isImageProcessing,
  processImages,

  files,
  isFileUploadPending,
  handleFilesChange,
  handleContentChange,
  handleContentBlur,

  submitForm,

  children,
  className,
}: EditProviderProps<T>) {
  const contextValue = {
    id: postId,
    form,
    register,
    isImageProcessing,
    processImages,
    files,
    isFileUploadPending,
    handleFilesChange,
    handleContentChange,
    handleContentBlur,
    submitForm,
  };

  return (
    <EditContext.Provider value={contextValue as unknown as EditContextType<Record<string, unknown>>}>
      <article className={cn('mt-[200px]', className)}>{children}</article>
    </EditContext.Provider>
  );
}

///// PageSkeleton /////
EditPage.PageSkeleton = function EditPageSkeleton() {
  return (
    <article className="mb-20 mt-16">
      <PostHeader.Skeleton />
      <hr className="bg-[#E7E7E7]" />
      <Container.Skeleton />
      <PostFooter.Skeleton />
    </article>
  );
};

///// ErrorPage /////
EditPage.ErrorPage = function EditErrorPage() {
  return (
    <div className="mt-16 flex items-center justify-center py-12">
      <p>오류가 발생하였습니다. 해당 페이지의 캡처본과 함께 관리자에게 문의하십시오.</p>
    </div>
  );
};
