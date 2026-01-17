import { ReactNode } from 'react';

import { cn } from '@/libs/utils';

import { FileInputs, FileInputsProps } from '@/components/edit/FileInputs';
import { useEditContext } from '@/containers/edit/useEditContext';

interface EditFileUploaderRootProps {
  children: ReactNode;
  className?: string;
}

function EditFileUploaderRoot({ children, className = '' }: EditFileUploaderRootProps) {
  return <section className={cn('mb-16', className)}>{children}</section>;
}

function EditFileUploaderTitle({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <h2 className={cn('mb-6 text-2xl font-semibold', className)}>{children}</h2>;
}

function EditFileUploaderFileInputs({
  sizeLimit,
  categories,
}: {
  sizeLimit: FileInputsProps['sizeLimit'];
  categories?: FileInputsProps['categories'];
}) {
  const { files, handleFilesChange } = useEditContext();

  return (
    <FileInputs
      categories={categories ? categories : undefined}
      files={files}
      onChange={handleFilesChange}
      sizeLimit={sizeLimit}
    />
  );
}

export const EditFileUploader = Object.assign(EditFileUploaderRoot, {
  Tilte: EditFileUploaderTitle,
  FileInputs: EditFileUploaderFileInputs,
});
