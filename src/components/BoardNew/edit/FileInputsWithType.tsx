import { ChangeEvent, useEffect, useState } from 'react';
import { PostFile } from '@/components/BoardNew/edit/FileInputWithType.tsx';
import { cn } from '@/libs/utils.ts';
import { FileInputWithType } from './FileInputWithType';

interface FileInputsProps {
  className?: string;
  sizeLimit?: number;
  files?: PostFile[];
  onChange?: (files: PostFile[]) => void;
}

export function FileInputsWithType({ className, files, onChange, sizeLimit }: FileInputsProps) {
  const [innerFiles, setInnerFiles] = useState<PostFile[]>([]);

  useEffect(() => {
    // 외부에서 전달된 files가 있으면 상태 초기화
    if (files) setInnerFiles(files);
    else setInnerFiles([]);
  }, [files]);

  function onNewFile(evt: ChangeEvent<HTMLInputElement>) {
    const file = evt.currentTarget.files?.item(0);
    if (file) {
      const postFile: PostFile = {
        name: file.name,
        isUploaded: false,
        file: file,
        category: '', // 기본 카테고리 설정
      };
      const newFiles = [...innerFiles, postFile];
      setInnerFiles(newFiles);
      if (onChange) onChange(newFiles);
      evt.currentTarget.files = new DataTransfer().files; // 파일 초기화
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
        file: file,
      };
    } else {
      newFiles.splice(idx, 1); // 파일 삭제
    }
    setInnerFiles(newFiles);
    if (onChange) onChange(newFiles);
  }

  function onCategoryChange(idx: number, category: string) {
    const newFiles = [...innerFiles];
    newFiles[idx] = {
      ...newFiles[idx],
      category: category, // 카테고리 업데이트
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
          onCategoryChange={(category) => onCategoryChange(idx, category)} // 카테고리 변경 핸들러 추가
        />
      ))}
      <FileInputWithType onChange={onNewFile} sizeLimit={sizeLimit} />
    </div>
  );
}
