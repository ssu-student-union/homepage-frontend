import { ChangeEvent, useEffect, useState } from 'react';
import { PostFile } from '@/components/BoardNew/edit/FileInputWithType.tsx';
import { cn } from '@/libs/utils.ts';
import { FileInputWithType } from './FileInputWithType';

interface FileInputsProps {
  className?: string;
  sizeLimit?: number;
  files?: PostFile[];
  fileCategories: string[];
  onChange?: (files: PostFile[]) => void;
}

export function FileInputsWithType({ className, files, fileCategories, onChange, sizeLimit }: FileInputsProps) {
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
        category: '',
      };
      const newFiles = [...innerFiles, postFile];
      setInnerFiles(newFiles);
      if (onChange) onChange(newFiles);
      evt.currentTarget.files = new DataTransfer().files;
    }
  }

  function onFileRemove(event: React.MouseEvent, idx: number) {
    event.stopPropagation();
    event.preventDefault();
    const newFiles = [...innerFiles];
    newFiles.splice(idx, 1);
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
          sizeLimit={sizeLimit}
          onCategoryChange={(category) => onCategoryChange(idx, category)}
          onRemove={(e) => onFileRemove(e, idx)}
          fileCategories={fileCategories}
        />
      ))}
      <FileInputWithType fileCategories={fileCategories} onChange={onNewFile} sizeLimit={sizeLimit} />
    </div>
  );
}
