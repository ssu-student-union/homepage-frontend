import { FileResponse } from '@/types/apis/get';
import { DownloadSimple } from '@phosphor-icons/react';

type AttachmentProps = FileResponse;

export function Attachment({ fileName, fileUrl }: AttachmentProps) {
  return (
    <a
      href={fileUrl}
      target="_blank"
      className="flex items-center gap-4 rounded-xs border border-gray-200 p-5 text-gray-600"
    >
      <DownloadSimple size="24px" />
      {fileName}
    </a>
  );
}
