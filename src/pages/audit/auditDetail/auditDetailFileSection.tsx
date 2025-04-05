import { DownloadSimple } from '@phosphor-icons/react';

interface AuditDetailFileProps {
  files: string[];
  fileNames: string[];
}

export function AuditDetailFileSection({ files, fileNames }: AuditDetailFileProps) {
  const openInNewTab = (filePath: string) => {
    window.open(filePath, '_blank');
  };

  const formatFileName = (fileName: string) => {
    const [name, ext] = fileName.split(/\s+/);
    return `${name.replace(/\s+/g, '.')}.${ext ? ext.toLowerCase() : ''}`;
  };

  return (
    <>
      {files.map((file, index) => (
        <div
          onClick={() => openInNewTab(file)}
          key={file + index}
          className="mb-3 flex cursor-pointer flex-row items-center justify-start rounded-xs border border-[#CDCDCD] p-2"
        >
          <DownloadSimple size="24px" />
          <div className="ml-2 flex-1 overflow-hidden">
            <p className="truncate text-base font-medium text-gray-600">{formatFileName(fileNames[index])}</p>
          </div>
        </div>
      ))}
    </>
  );
}
