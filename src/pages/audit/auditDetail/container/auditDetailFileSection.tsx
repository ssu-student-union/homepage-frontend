import { DownloadSimple } from '@phosphor-icons/react';

interface AuditDetailFileProps {
  files: string[];
}

export function AuditDetailFileSection({ files }: AuditDetailFileProps) {
  const handleDownload = async (filePath: string) => {
    try {
      const response = await fetch(filePath);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = filePath.split('/').pop() || 'download';
      document.body.appendChild(a);
      a.click();

      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        a.remove();
      }, 1000);
    } catch (error) {
      console.error('Download error:', error);
    }
  };

  return (
    <>
      {files.map((file, index) => (
        <div key={index} className="flex flex-row items-center justify-start rounded-xs border border-[#CDCDCD] p-2">
          <DownloadSimple size="24px" className="cursor-pointer pl-[3px]" onClick={() => handleDownload(file)} />
          <div className="w-[5px]" />
          <div>
            <p className="text-base font-medium text-gray-600">{file}</p>
          </div>
        </div>
      ))}
    </>
  );
}
