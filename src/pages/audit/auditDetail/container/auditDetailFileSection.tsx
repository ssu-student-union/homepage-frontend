import { DownloadSimple } from '@phosphor-icons/react';

interface AuditDetailFileProps {
  file: { fileName: string; fileUrl: string };
}

export function AuditDetailFileSection({ file }: AuditDetailFileProps) {
  const handleDownload = () => {
    // 파일 다운로드
    alert('다운로드');
  };

  return (
    <div className="px-[120px] xs:px-[20px] sm:px-[40px]">
      <div className="flex flex-row items-center justify-start rounded-xs border border-[#CDCDCD] p-2">
        <DownloadSimple size="24px" className="cursor-pointer pl-[3px]" onClick={handleDownload} />
        <div className="w-[5px]" />
        <div>
          <p className="text-base font-medium text-gray-600">{file.fileName}</p>
        </div>
      </div>
    </div>
  );
}
