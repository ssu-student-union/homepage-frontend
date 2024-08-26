import { DownloadSimple } from '@phosphor-icons/react';

interface AuditDetailFileProps {
  files: string[];
}

export function AuditDetailFileSection({ files }: AuditDetailFileProps) {
  const handleDownload = (filePath: string) => {
    const link = document.createElement('a');
    link.href = filePath;
    link.download = filePath.split('/').pop() || '파일명.pdf';
    link.target = '_blank'; // 일부 브라우저에서 필요하답니다.
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {files.map((file) => (
        <div className="flex flex-row items-center justify-start rounded-xs border border-[#CDCDCD] p-2">
          <DownloadSimple size="24px" className="cursor-pointer pl-[3px]" onClick={() => handleDownload(file)} />
          <div className="w-[5px]" />
          <div>
            <p className="text-base font-medium text-gray-600">파일명.확장자</p>
          </div>
        </div>
      ))}
    </>
  );
}
