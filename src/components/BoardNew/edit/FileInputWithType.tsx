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

interface FileInputsProps {
  className?: string;
  sizeLimit?: number;
  files?: PostFile[];
  onChange?: (files: PostFile[]) => void;
}

export function FileInputsWithType({ className, files, onChange, sizeLimit }: FileInputsProps) {
  const [innerFiles, setInnerFiles] = useState<PostFile[]>([]);

  useEffect(() => {
    if (files) setInnerFiles(files);
    else setInnerFiles([]);
  }, [files]);

  function onNewFile(evt: ChangeEvent<HTMLInputElement>) {
    const file = evt.currentTarget.files?.item(0);
    if (file) {
      const postFile: PostFile = {
        name: file.name,
        isUploaded: false,
        file,
        category: '', // 기본 카테고리 설정
      };
      const newFiles = [...innerFiles, postFile];
      setInnerFiles(newFiles);
      if (onChange) onChange(newFiles);
      evt.currentTarget.files = new DataTransfer().files;
    }
  }

  function onFileChange(idx: number, evt: ChangeEvent<HTMLInputElement>) {
    const file = evt.currentTarget.files?.item(0);
    const newFiles = [...innerFiles];
    if (file) {
      newFiles[idx] = {
        ...newFiles[idx],
        name: file.name,
        isUploaded: false,
        file,
      };
    } else {
      newFiles.splice(idx, 1);
    }
    setInnerFiles(newFiles);
    if (onChange) onChange(newFiles);
  }

  function onCategoryChange(idx: number, category: string) {
    const newFiles = [...innerFiles];
    newFiles[idx] = {
      ...newFiles[idx],
      category,
    };
    setInnerFiles(newFiles);
    if (onChange) onChange(newFiles);
  }

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      {innerFiles.map((file, idx) => (
        <FileInputWithType
          key={idx}
          file={file}
          onChange={(evt) => onFileChange(idx, evt)}
          sizeLimit={sizeLimit}
          onCategoryChange={(category) => onCategoryChange(idx, category)}
        />
      ))}
      <FileInputWithType onChange={onNewFile} sizeLimit={sizeLimit} />
    </div>
  );
}

interface FileItemProps {
  file?: PostFile;
  sizeLimit?: number;
  onChange?: (evt: ChangeEvent<HTMLInputElement>) => void;
  onCategoryChange?: (category: string) => void;
}

export const FileInputWithType = ({ file, sizeLimit, onChange, onCategoryChange }: FileItemProps) => {
  const [fileCategory, setFileCategory] = useState<string>(file?.category || '');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFileCategory(file?.category || '');
  }, [file]);

  function handleCategoryChange(category: string) {
    setFileCategory(category);
    if (onCategoryChange) onCategoryChange(category);
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

  const fileCategories: string[] = ['결산안', '활동보고', '자료'];

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
        {' '}
        {file && (
          <FilterDropDown
            className="flex h-[48px] w-[354px] justify-center rounded-[12px] border-gray-500 text-[19px] font-medium xs:w-[257px] sm:w-[187px]"
            defaultValue="파일종류 선택"
            optionValue={fileCategories}
            value={fileCategory}
            onValueChange={handleCategoryChange}
          />
        )}
        <button className="p-2" onClick={triggerFileInput}>
          {file ? <Trash className="text-gray-600" size="32" /> : <Plus className="text-gray-600" size="32" />}
        </button>
        <input ref={fileInputRef} type="file" className="hidden" onChange={fileChangeHandler} />
      </div>
    </div>
  );
};
