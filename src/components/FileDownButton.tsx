import { cn } from '@/libs/utils';
import { FileResponse } from '@/schemas/post.ts';
import { buttonVariants } from '@/components/ui/button.tsx';

// 자료집 '/data'에 쓰이는 FileDownButton입니다.

export default function FileDownButton({ file, className }: { file: FileResponse; className?: string }) {
  // fileUrl에서 확장자명을 추출한 후 대문자로 변경
  const lastDotIndex = file.fileUrl.lastIndexOf('.');
  const fileExtension = lastDotIndex !== -1 ? file.fileUrl.substring(lastDotIndex + 1) : '';
  return (
    <a
      className={cn(
        buttonVariants(),
        'h-6 rounded-sm bg-gray-200 px-5 py-1 text-sm font-medium text-gray-600 md:h-8 md:text-base',
        'cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap hover:text-white',
        className
      )}
      title={file.fileType}
      href={file.fileUrl}
      download={file.fileName}
    >
      {file.fileName === '구자료집' ? `${file.fileType}` : `${file.fileType} ${fileExtension.toUpperCase()}`}
    </a>
  );
}
