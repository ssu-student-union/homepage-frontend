import { cn } from '@/libs/utils';
import { FileResponse } from '@/schemas/post.ts';

// 자료집 '/data'에 쓰이는 FileDownButton입니다.

export default function FileDownButton({ file, className = '' }: { file: FileResponse; className?: string }) {
  const handleDownload = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    const link = document.createElement('a');
    link.href = file.fileUrl;
    link.download = file.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      className={cn(
        'h-[31px] w-[143px] rounded-[9px] bg-gray-200 text-[16px] font-medium text-gray-600',
        'cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap px-2',
        className
      )}
      title={file.fileType}
      onClick={handleDownload}
    >
      {file.fileType}
    </button>
  );
}
