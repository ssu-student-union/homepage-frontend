import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Trash, Plus, FileText } from '@phosphor-icons/react';

interface FileItem {
  id: number;
  file: File | null;
}

export function AuditEditFilesSection() {
  const [files, setFiles] = useState<FileItem[]>([{ id: 0, file: null }]);

  const onDrop = (acceptedFiles: File[], index: number) => {
    const newFiles = [...files];
    newFiles[index].file = acceptedFiles[0];
    setFiles(newFiles);

    const allFilled = newFiles.every((fileItem) => fileItem.file !== null);
    if (allFilled) {
      addEmptyField();
    }
  };

  const addEmptyField = () => {
    setFiles([...files, { id: Date.now(), file: null }]);
  };

  const removeFileField = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  return (
    <div className="flex flex-col items-center justify-center pt-[8px]">
      <div className="full flex w-full flex-col">
        {files.map((fileItem, index) => (
          <div key={fileItem.id} className="flex items-center pb-[8px]">
            <FileDropzone file={fileItem.file} onDrop={(acceptedFiles) => onDrop(acceptedFiles, index)} />
            {fileItem.file ? (
              <button onClick={() => removeFileField(index)} className="mx-6">
                <Trash size={24} />
              </button>
            ) : (
              <div className="flex items-center">
                <button onClick={addEmptyField} className="mx-6">
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

interface FileDropzoneProps {
  file: File | null;
  onDrop: (acceptedFiles: File[]) => void;
}

function FileDropzone({ file, onDrop }: FileDropzoneProps) {
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="flex w-full cursor-pointer items-center rounded border px-3 py-2">
      <input {...getInputProps()} />
      <FileText size="24" className="mr-3" />
      {file ? (
        <p className="text-sm">{file.name}</p>
      ) : (
        <p className="text-medium text-sm text-gray-400">파일을 선택해주세요</p>
      )}
    </div>
  );
}
