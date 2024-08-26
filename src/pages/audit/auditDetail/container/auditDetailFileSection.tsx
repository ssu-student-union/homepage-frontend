import { DownloadSimple } from '@phosphor-icons/react';

interface AuditDetailFileProps {
  files: { fileName: string; fileUrl: string };
}

export function AuditDetailFileSection({ files }: AuditDetailFileProps) {
  const handleDownload = () => {
    alert('다운로드');
  };
  s;
  return (
    <div className="flex flex-row items-center justify-start rounded-xs border border-[#CDCDCD] p-2">
      <DownloadSimple size="24px" className="cursor-pointer pl-[3px]" onClick={handleDownload} />
      <div className="w-[5px]" />
      <div>
        <p className="text-base font-medium text-gray-600">{files.fileName}</p>
      </div>
    </div>
  );
}
