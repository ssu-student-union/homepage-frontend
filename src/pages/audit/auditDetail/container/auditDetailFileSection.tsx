import { DownloadSimple } from '@phosphor-icons/react';

interface AuditDetailFileProps {
  files: string[];
}

export function AuditDetailFileSection({ files }: AuditDetailFileProps) {
  const handleDownload = async (filePath: string) => {
    try {
      const response = await fetch(filePath); // 파일 경로에서 실제 데이터를 가져옵니다.
      const blob = await response.blob(); // 응답을 Blob 객체로 변환합니다.
      const url = window.URL.createObjectURL(blob); // Blob을 Object URL로 변환합니다.

      const a = document.createElement('a');
      a.href = url;
      a.download = filePath.split('/').pop() || 'download'; // 파일명을 설정합니다.
      document.body.appendChild(a);
      a.click();

      setTimeout(() => {
        window.URL.revokeObjectURL(url); // Object URL 해제
        a.remove(); // <a> 태그 제거
      }, 1000);
    } catch (error) {
      console.error('Download error:', error);
    }
  };

  return (
    <>
      {files.map((file) => (
        <div className="flex flex-row items-center justify-start rounded-xs border border-[#CDCDCD] p-2">
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
