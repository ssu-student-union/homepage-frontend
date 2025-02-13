import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { cn } from '@/libs/utils.ts';
import { FileText, Plus, Trash } from '@phosphor-icons/react';
import { FilterDropDown } from '@/components/FilterDropDown/FilterDropDown';

export type PostFile = UploadedPostFile | LocalPostFile;

export interface UploadedPostFile {
  name: string;
  isUploaded: true;
  id: number;
  category?: string;
}

export interface LocalPostFile {
  name: string;
  isUploaded: false;
  file: File;
  category?: string;
}

interface FileItemProps {
  file?: PostFile;
  fileCategories?: string[];
  sizeLimit?: number;
  onChange?: (evt: ChangeEvent<HTMLInputElement>) => void;
  onCategoryChange?: (category: string) => void;
  onRemove?: (event: React.MouseEvent) => void;
}

export const FileInputWithType = ({
  file,
  sizeLimit,
  fileCategories,
  onChange,
  onCategoryChange,
  onRemove,
}: FileItemProps) => {
  const [fileCategory, setFileCategory] = useState<string>(file?.category || '');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFileCategory(file?.category || '');
  }, [file]);

  function handleCategoryChange(category: string) {
    setFileCategory(category);
    if (onCategoryChange) {
      onCategoryChange(category);
    }
  }

  function fileChangeHandler(evt: ChangeEvent<HTMLInputElement>) {
    const fileSize = evt.currentTarget.files?.item(0)?.size ?? -1;
    if (fileSize >= 0 && sizeLimit && fileSize > sizeLimit) {
      evt.currentTarget.files = new DataTransfer().files;
      setError(`파일 크기가 ${sizeLimit}를 초과합니다.`);
      return;
    }
    setError(null);
    if (onChange) onChange(evt);
  }

  function triggerFileInput() {
    fileInputRef.current?.click();
  }

  function fileDropHandler(evt: React.DragEvent<HTMLDivElement>) {
    evt.preventDefault();
    setDragging(false);
    const file = evt.dataTransfer.files?.item(0);
    if (fileInputRef.current && file) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInputRef.current.files = dataTransfer.files;
      fileInputRef.current.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  function dragOverHandler(evt: React.DragEvent<HTMLDivElement>) {
    evt.preventDefault();
    setDragging(true);
  }

  function dragLeaveHandler(evt: React.DragEvent<HTMLDivElement>) {
    evt.preventDefault();
    setDragging(false);
  }

  return (
    <div
      className={cn('flex flex-row items-center gap-4 xs:items-start sm:flex-col sm:items-start')}
      onDrop={fileDropHandler}
      onDragOver={dragOverHandler}
      onDragLeave={dragLeaveHandler}
    >
      <div
        className={cn(
          'flex grow cursor-pointer items-center gap-4 rounded-[5px] border-2 border-[#CDCDCD] p-[8px] text-gray-400',
          error && 'border-red-800 bg-red-50 text-red-800',
          isDragging && 'border-dashed border-primary bg-blue-50 text-primary',
          file && 'text-gray-600'
        )}
        onClick={triggerFileInput}
      >
        <FileText
          className={cn(
            'select-none text-gray-600',
            error && 'text-red-800',
            isDragging && 'text-primary motion-safe:animate-bounce'
          )}
          size="32"
        />
        <span>{file?.name || (isDragging ? '파일을 여기에 놓으세요' : '파일을 선택해주세요')}</span>
      </div>
      <div className="flex flex-row">
        {file && (
          <FilterDropDown
            className="flex h-[48px] w-[354px] justify-center rounded-[12px] border-gray-500 text-[19px] font-medium xs:w-[257px] sm:w-[187px]"
            defaultValue="파일종류 선택"
            optionValue={fileCategories || []}
            value={fileCategory}
            onValueChange={handleCategoryChange}
          />
        )}
        {file ? (
          <button className="p-2" onClick={onRemove}>
            <Trash className="text-gray-600" size="32" />
          </button>
        ) : (
          <button className="p-2" onClick={triggerFileInput}>
            <Plus className="text-gray-600" size="32" />
          </button>
        )}
        <input ref={fileInputRef} type="file" className="hidden" onChange={fileChangeHandler} />
      </div>
    </div>
  );
};
