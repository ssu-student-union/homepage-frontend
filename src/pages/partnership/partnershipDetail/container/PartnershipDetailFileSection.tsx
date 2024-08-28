import { DownloadSimple } from '@phosphor-icons/react';

interface PartnershipDetailFileProps {
  file: { fileName: string; fileUrl: string };
}

export function PartnershipDetailFileSection({ file }: PartnershipDetailFileProps) {
  const handleDownload = () => {
    // 파일 다운로드
    alert('다운로드');
  };

  return (
    <div className="flex flex-row items-center justify-start rounded-xs border border-[#CDCDCD] p-2">
      <DownloadSimple size="24px" className="cursor-pointer pl-[3px]" onClick={handleDownload} />
      <div className="w-[5px]" />
      <div>
        <p className="text-base font-medium text-gray-600">{file.fileName}</p>
      </div>
    </div>
  );
}
