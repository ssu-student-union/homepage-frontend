import { cn } from '@/libs/utils.ts';
import { FileText, Plus, Trash } from '@phosphor-icons/react';
import {
  ChangeEvent,
  DragEvent,
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { humanFileSize } from '@/pages/human-rights/edit/utils.ts';
import { FilterDropDown } from '@/components/FilterDropDown/FilterDropDown.tsx';

export type PostFile = UploadedPostFile | LocalPostFile;

export interface UploadedPostFile {
  name: string;
  isUploaded: true;
  id: number;
  category?: string;
}

export interface LocalPostFile {
  name: string;
  isUploaded: false;
  file: File;
  category?: string;
}

interface FileItemProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'multiple' | 'value'> {
  sizeLimit?: number;
  file?: PostFile;
  categories?: string[];
  onCategoryChange?: (category: string) => void;
}

export const FileInput = forwardRef<HTMLInputElement, FileItemProps>(function (
  { file, className, onChange, sizeLimit, categories, onCategoryChange, ...props }: FileItemProps,
  ref
) {
  const [innerFile, setInnerFile] = useState<PostFile | null>(null);
  const innerRef = useRef<HTMLInputElement>(null);
  const [isDragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useImperativeHandle(ref, () => innerRef.current!, []);

  useEffect(() => {
    if (innerRef.current) {
      const dataTransfer = new DataTransfer();
      if (file) {
        if (!file.isUploaded) dataTransfer.items.add(file.file);
      }
      innerRef.current.files = dataTransfer.files;
    }
    setInnerFile(file ?? null);
  }, [file]);

  function clearFile() {
    if (innerRef.current) {
      innerRef.current.files = new DataTransfer().files;
      innerRef.current.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  function fileDropHandler(evt: DragEvent<HTMLDivElement>): void {
    evt.preventDefault();
    setDragging(false);
    if (innerRef.current && evt.dataTransfer.files.length > 0) {
      innerRef.current.files = evt.dataTransfer.files;
      innerRef.current.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  function dragOverHandler(evt: DragEvent<HTMLDivElement>): void {
    evt.preventDefault();
    setDragging(true);
  }

  function dragExitHandler(evt: DragEvent<HTMLDivElement>): void {
    evt.preventDefault();
    setDragging(false);
  }

  function fileChangeHandler(evt: ChangeEvent<HTMLInputElement>): void {
    evt.preventDefault();
    const fileSize = evt.currentTarget.files?.item(0)?.size ?? -1;
    if (fileSize >= 0 && sizeLimit !== undefined && fileSize > sizeLimit) {
      clearFile();
      setError(`파일이 ${humanFileSize(sizeLimit)}를 초과합니다. (파일 크기: ${humanFileSize(fileSize)})`);
      return;
    } else {
      setError(null);
    }
    // Give priority to user's onChange -- this allows intercept files input before component process file itself.
    // 컴포넌트 사용자의 onChange를 우선 실행하여 파일 입력을 처리하기 전에 사용자가 가로챌 수 있도록 합니다.
    if (onChange) {
      onChange(evt);
    }
    const file = evt.currentTarget.files?.item(0);
    setInnerFile(
      file
        ? {
            name: file.name,
            isUploaded: false,
            file,
          }
        : null
    );
  }

  function categoryChangeHandler(category: string) {
    onCategoryChange?.(category);
    if (file)
      setInnerFile({
        ...file,
        category,
      });
  }

  return (
    <div
      className={cn('flex cursor-pointer items-center gap-4', className)}
      onDrop={fileDropHandler}
      onDragOver={dragOverHandler}
      onDragExit={dragExitHandler}
    >
      <div
        className={cn(
          'flex grow items-center gap-4 rounded-md border-2 border-[#CDCDCD] p-4 text-gray-400',
          error && 'border-red-800 bg-red-50 text-red-800',
          isDragging && 'border-dashed border-primary bg-blue-50 text-primary',
          innerFile && 'text-gray-600'
        )}
        onClick={() => innerRef.current?.showPicker()}
      >
        <FileText
          className={cn(
            'select-none text-gray-600',
            error && 'text-red-800',
            isDragging && 'text-primary motion-safe:animate-bounce'
          )}
          size="32"
        />
        <span>
          {isDragging ? (
            innerFile ? (
              '파일을 끌어놓아 변경하기'
            ) : (
              '파일을 끌어놓아 추가하기'
            )
          ) : error ? (
            <>
              <span className="mr-3 font-bold">업로드 실패</span>
              {error}
            </>
          ) : (
            (innerFile?.name ?? '파일을 선택해주세요')
          )}
        </span>
      </div>
      {innerFile && categories && (
        <FilterDropDown
          className="flex h-[64px] w-[257px] justify-center rounded-[12px] border-gray-500 text-[19px] font-medium md:w-[354px]"
          defaultValue="파일종류 선택"
          optionValue={categories || []}
          onValueChange={categoryChangeHandler}
        />
      )}
      <button
        className="p-4"
        onClick={() => (innerFile ? innerRef.current != null && clearFile() : innerRef.current?.showPicker())}
      >
        {innerFile ? <Trash className="text-gray-600" size="32" /> : <Plus className="text-gray-600" size="32" />}
      </button>
      <input ref={innerRef} type="file" className="hidden" multiple={false} onChange={fileChangeHandler} {...props} />
    </div>
  );
});
