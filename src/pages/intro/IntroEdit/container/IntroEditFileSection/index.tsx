import { useDropzone } from 'react-dropzone';
import { XCircle } from '@phosphor-icons/react';
import { useFileHook } from './hooks/useFileHook';

interface IntroEditProps {
  category: string;
  subCategory: string;
}

export default function IntroEditFileSection({ category, subCategory }: IntroEditProps) {
  const { files, onDrop, removeFile } = useFileHook();

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
    },
    multiple: false,
  });

  const handleSubmit = () => {
    if (files.length > 0) {
      const file = files[0];
      const extension = file.name.split('.').pop();
      const fileName = `${category}_${subCategory}.${extension}`;
      console.log(`저장 성공 파일명 : ${fileName}`);
    } else {
      console.log('저장 실패');
    }
  };

  return (
    <div className="size-full px-[30px] pt-[20px] sm:px-[60px] md:px-[120px]">
      {(subCategory === 'intro' || subCategory === 'org') && files.length === 0 && (
        <div
          {...getRootProps()}
          className="flex h-[480px] cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-primary p-5 text-center"
        >
          <input {...getInputProps()} />
          <p>이미지 업로드, 또는 파일 놓기</p>
        </div>
      )}
      <aside className="mt-5 flex flex-col">
        <RenderThumbnail files={files} removeFile={removeFile} />
      </aside>
      <RenderSubmitButton onSubmit={handleSubmit} />
    </div>
  );
}

interface RenderThumbnailProps {
  files: { name: string; preview: string }[];
  removeFile: () => void;
}

function RenderThumbnail({ files, removeFile }: RenderThumbnailProps) {
  return (
    <>
      {files.map((file) => (
        <div key={file.name} className="relative h-auto w-full overflow-hidden rounded-md">
          <img src={file.preview} className="size-full object-cover" alt={file.name} />
          <button onClick={() => removeFile()} className="absolute right-2 top-2 cursor-pointer">
            <XCircle className="size-6 text-red-500" />
          </button>
        </div>
      ))}
    </>
  );
}

import { RegisterButton } from '@/components/Buttons/BoardActionButtons';

interface RenderSubmitButtonProps {
  onSubmit: () => void;
}

export function RenderSubmitButton({ onSubmit }: RenderSubmitButtonProps) {
  return (
    <div className="flex justify-end py-[20px] md:py-[40px]">
      <RegisterButton onClick={onSubmit} className="h-[30px] w-full rounded-xs text-sm md:w-[72px]" />
    </div>
  );
}
