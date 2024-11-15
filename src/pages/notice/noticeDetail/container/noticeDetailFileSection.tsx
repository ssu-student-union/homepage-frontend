import { DownloadSimple } from '@phosphor-icons/react';

interface NoticeDetailFileProps {
  files: string[];
  fileNames: string[];
}

export function NoticeDetailFileSection({ files, fileNames }: NoticeDetailFileProps) {
  const downloadFile = (filePath: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {files.map((file, index) => (
        <div
          onClick={() => downloadFile(file, formatFileName(fileNames[index]))}
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
