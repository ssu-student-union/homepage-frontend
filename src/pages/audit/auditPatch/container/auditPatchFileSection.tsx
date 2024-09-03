import { Trash } from '@phosphor-icons/react';
import { Plus } from 'lucide-react';
import { FileDropzone } from '../../auditEdit/component/fileDropzone';
import { useState } from 'react';
import { FileText } from '@phosphor-icons/react';
import { addEmptyField, onDrop, removeFileField } from '../../auditEdit/utils/fileHandler';

export interface FileItem {
  id: number;
  file: File | null;
}

interface AuditPatchFilesSectionProps {
  fileUrls?: string[];
  onFileDelete: (fileUrl: string) => void;
  onFilesChange: (newFiles: File[]) => void;
}

export function AuditPatchFilesSection({ fileUrls = [], onFileDelete, onFilesChange }: AuditPatchFilesSectionProps) {
  const [newFiles, setFiles] = useState<FileItem[]>([{ id: Date.now(), file: null }]);

  return (
    <div className="flex flex-col items-center justify-center px-[200px] pt-[12px] xs:px-[30px] sm:px-[30px] md:px-[30px] lg:px-[30px]">
      <div className="full flex w-full flex-col">
        {fileUrls.map((fileItem, index) => (
          <div key={fileItem + index} className="flex items-center">
            <div className="flex w-full cursor-pointer items-center rounded border-[0.125rem] border-gray-300 px-3 py-2">
              <FileText size={24} className="mr-3" />
              <p className="text-sm text-gray-600">{fileItem.split('/').pop()}</p>
            </div>
            <button onClick={() => onFileDelete(fileItem)} className="mx-6">
              <Trash size={24} />
            </button>
          </div>
        ))}
        {newFiles.map((fileItem, index) => (
          <div key={fileItem.id} className="flex items-center py-[8px]">
            <FileDropzone
              file={fileItem.file}
              onDrop={(acceptedFiles) =>
                onDrop(acceptedFiles, index, newFiles, setFiles, onFilesChange, () => addEmptyField(newFiles, setFiles))
              }
            />
            {fileItem.file ? (
              <button onClick={() => removeFileField(index, newFiles, setFiles, onFilesChange)} className="mx-6">
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
