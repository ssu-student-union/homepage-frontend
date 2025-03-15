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
        'h-[31px] w-[143px] rounded-[9px] bg-gray-200 text-[16px] font-medium text-gray-600',
        'cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap px-2 hover:text-white',
        className
      )}
      title={file.fileType}
      href={file.fileUrl}
      download={file.fileName}
    >
      {`${file.fileType} ${fileExtension.toUpperCase()}`}
    </a>
  );
}
