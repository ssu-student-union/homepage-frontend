import { ChangeEvent, useEffect, useState } from 'react';
import { FileInput, PostFile } from '@/pages/human-rights/edit/components/FileInput.tsx';
import { cn } from '@/libs/utils.ts';

interface FileInputsProps {
  className?: string;
  sizeLimit?: number;
  files?: PostFile[];
  onChange?: (files: PostFile[]) => void;
}

export function FileInputs({ className, files, onChange, sizeLimit }: FileInputsProps) {
  const [innerFiles, setInnerFiles] = useState<PostFile[]>([]);

  useEffect(() => {
    // Do not trigger onChange if files are controlled from outside.
    // 외부에서 files 값이 변경될 경우 re-render는 수행하지만 onChange 이벤트를 발생시키지 않습니다.
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
      };
      const newFiles = [...innerFiles, postFile];
      setInnerFiles(newFiles);
      if (onChange) onChange(newFiles);
      // Remove the existing file in the new file input to keep input fresh.
      // 새 파일을 입력받는 input 의 파일을 제거하여 파일이 추가된 상태로 보이지 않도록 합니다.
      evt.currentTarget.files = new DataTransfer().files;
    }
  }

  function onFileChange(idx: number, evt: ChangeEvent<HTMLInputElement>) {
    const file = evt.currentTarget.files?.item(0);
    const newFiles = innerFiles;
    if (file) {
      newFiles[idx] = {
        name: file.name,
        isUploaded: false,
        file: file,
      };
    } else {
      newFiles.splice(idx, 1);
    }
    if (onChange) onChange(newFiles);
    setInnerFiles([...newFiles]);
  }

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      {innerFiles.map((file, idx) => (
        <FileInput key={idx} file={file} onChange={(evt) => onFileChange(idx, evt)} sizeLimit={sizeLimit} />
      ))}
      <FileInput onChange={onNewFile} sizeLimit={sizeLimit} />
    </div>
  );
}
