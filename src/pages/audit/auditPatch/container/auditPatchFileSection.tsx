import { Trash } from '@phosphor-icons/react';
import { Plus } from 'lucide-react';
import { FileDropzone } from '../../auditEdit/component/fileDropzone';
import { useState, useEffect } from 'react';
import { FileText } from '@phosphor-icons/react';
import { addEmptyField, onDrop, removeFileField } from '../../auditEdit/utils/fileHandler';

export interface FileItem {
  id: number;
  file: File | null;
}

interface AuditPatchFilesSectionProps {
  fileUrls?: string[];
  fileNames?: string[];
  onFileDelete: (fileUrl: string) => void;
  onFilesChange: (newFiles: File[]) => void;
}

export function AuditPatchFilesSection({
  fileUrls = [],
  fileNames = [],
  onFileDelete,
  onFilesChange,
}: AuditPatchFilesSectionProps) {
  const [newFiles, setFiles] = useState<FileItem[]>([{ id: Date.now(), file: null }]);
  const [remainingFileUrls, setRemainingFileUrls] = useState(fileUrls);

  useEffect(() => {
    const files = newFiles.map((fileItem) => fileItem.file).filter((file) => file !== null) as File[];
    onFilesChange(files);
  }, [newFiles, onFilesChange]);

  const handleExistingFileDelete = (fileUrl: string) => {
    onFileDelete(fileUrl);
    setRemainingFileUrls((prev) => prev.filter((url) => url !== fileUrl));
  };

  const handleNewFileDelete = (index: number) => {
    removeFileField(index, newFiles, setFiles, onFilesChange);
  };

  return (
    <div className="flex flex-col items-center justify-center px-[30px] pt-[12px] xl:px-[200px]">
      <div className="full flex w-full flex-col">
        {/* 기존 파일 목록 */}
        {remainingFileUrls.map((fileItem, index) => (
          <div key={fileItem + index} className="flex items-center py-[8px]">
            <div className="flex w-full cursor-pointer items-center rounded border-[0.125rem] border-gray-300 px-3 py-2">
              <FileText size={24} className="mr-3" />
              <p className="text-sm text-gray-600">{fileNames[index] || fileItem.split('/').pop()}</p>
            </div>
            <button onClick={() => handleExistingFileDelete(fileItem)} className="mx-6">
              <Trash size={24} />
            </button>
          </div>
        ))}

        {/* 새로운 파일 추가 부분 */}
        {newFiles.map((fileItem, index) => (
          <div key={fileItem.id} className="flex items-center py-[8px]">
            <FileDropzone
              file={fileItem.file}
              onDrop={(acceptedFiles) =>
                onDrop(acceptedFiles, index, newFiles, setFiles, onFilesChange, () => addEmptyField(newFiles, setFiles))
              }
            />
            {fileItem.file ? (
              <button onClick={() => handleNewFileDelete(index)} className="mx-6">
                <Trash size={24} />
              </button>
            ) : (
              <div className="flex items-center">
                <Plus size={24} className="mx-6" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
