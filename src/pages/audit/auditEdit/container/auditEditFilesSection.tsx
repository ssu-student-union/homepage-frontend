import { useState } from 'react';
import { Trash, Plus } from '@phosphor-icons/react';
import { onDrop } from '../utils/onDrop';
import { addEmptyField } from '../utils/addEmptyField';
import { removeFileField } from '../utils/removeFileField';
import { FileDropzone } from '../component/fileDropzone';

export interface FileItem {
  id: number;
  file: File | null;
}

interface AuditEditFilesSectionProps {
  onFilesChange: (files: File[]) => void;
}

export function AuditEditFilesSection({ onFilesChange }: AuditEditFilesSectionProps) {
  const [files, setFiles] = useState<FileItem[]>([{ id: Date.now(), file: null }]);

  return (
    <div className="flex flex-col items-center justify-center px-[200px] pt-[12px] xs:px-[30px] sm:px-[30px] md:px-[30px] lg:px-[30px]">
      <div className="full flex w-full flex-col">
        {files.map((fileItem, index) => (
          <div key={fileItem.id} className="flex items-center pb-[8px]">
            <FileDropzone
              file={fileItem.file}
              onDrop={(acceptedFiles) =>
                onDrop(acceptedFiles, index, files, setFiles, onFilesChange, () => addEmptyField(files, setFiles))
              }
            />
            {fileItem.file ? (
              <button onClick={() => removeFileField(index, files, setFiles, onFilesChange)} className="mx-6">
                <Trash size={24} />
              </button>
            ) : (
              <div className="flex items-center">
                <button onClick={() => addEmptyField(files, setFiles)} className="mx-6">
                  <Plus size={24} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
