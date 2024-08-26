import { DownloadSimple } from '@phosphor-icons/react';

interface AuditDetailFileProps {
  files: string[];
}

export function AuditDetailFileSection({ files }: AuditDetailFileProps) {
  const handleDownload = (filePath: string) => {
    window.location.href = filePath;
  };

  return (
    <>
      {files.map((file) => (
        <div className="flex flex-row items-center justify-start rounded-xs border border-[#CDCDCD] p-2">
          <DownloadSimple size="24px" className="cursor-pointer pl-[3px]" onClick={() => handleDownload(file)} />
          <div className="w-[5px]" />
          <div>
            <p className="text-base font-medium text-gray-600">{files}</p>
          </div>
        </div>
      ))}
    </>
  );
}
