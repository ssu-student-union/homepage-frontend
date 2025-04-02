import { useState } from 'react';
import { Trash, Plus } from '@phosphor-icons/react';
import { FileDropzone } from '../component/fileDropzone';
import { addEmptyField, onDrop, removeFileField } from '../utils/fileHandler';

export interface FileItem {
  id: number;
  file: File | null;
}

interface PartnershipEditFilesSectionProps {
  onFilesChange: (files: File[]) => void;
}

export function PartnershipEditFilesSection({ onFilesChange }: PartnershipEditFilesSectionProps) {
  const [files, setFiles] = useState<FileItem[]>([{ id: Date.now(), file: null }]);

  return (
    <div className="flex flex-col items-center justify-center px-[30px] pt-[12px] xl:px-[200px]">
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
                <button className="mx-6">
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
