import { DownloadSimple } from '@phosphor-icons/react';

interface NoticeDetailFileProps {
  files: string[];
  fileNames: string[];
}

export function NoticeDetailFileSection({ files, fileNames }: NoticeDetailFileProps) {
  const openInNewTab = (filePath: string) => {
    window.open(filePath, '_blank');
  };

  return (
    <>
      {files.map((file, index) => (
        <div
          onClick={() => openInNewTab(file)}
          key={file + index}
          className="mb-[0.75rem] flex cursor-pointer flex-row items-center justify-start rounded-xs border border-[#CDCDCD] p-2"
        >
          <DownloadSimple size="24px" />
          <div className="ml-[0.5rem] flex-1 overflow-hidden">
            <p className="truncate text-base font-medium text-gray-600">{fileNames[index]}</p>
          </div>
        </div>
      ))}
    </>
  );
}
