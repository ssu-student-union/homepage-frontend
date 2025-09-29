import { PostFile } from '@/components/edit/FileInput';
import { UseContentEditorReturn } from '@/hooks/useContentEditor';
import { createContext, useContext } from 'react';
import { UseFormReturn } from 'react-hook-form';

export interface EditContextType<T extends Record<string, unknown>> {
  id: number | null;

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
}

export const EditContext = createContext<EditContextType<Record<string, unknown>> | null>(null);

export function useEditContext<T extends Record<string, unknown>>() {
  const context = useContext(EditContext) as EditContextType<T> | null;
  if (!context) throw Error('Edit Slot 컴포넌트는 EditProvider 내부에서 사용해야 합니다.');
  return context;
}
