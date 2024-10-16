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

interface FileItemProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'multiple' | 'value'> {
  // Assert value is string since value is actual string if type of input is "file"
  // See here: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#value
  // input의 type 값이 "file"일 경우 실제로 value 값은 string 이므로 string으로 단언합니다.
  // 정보: https://developer.mozilla.org/ko-KR/docs/Web/HTML/Element/input/file#값
  file?: File;
}

export const FileInput = forwardRef<HTMLInputElement, FileItemProps>(function (
  { file, className, onChange, ...props }: FileItemProps,
  ref
) {
  const [innerFile, setInnerFile] = useState<File | null>(null);
  const innerRef = useRef<HTMLInputElement>(null);
  const [isDragging, setDragging] = useState(false);
  useImperativeHandle(ref, () => innerRef.current!, []);

  useEffect(() => {
    if (innerRef.current) {
      const dataTransfer = new DataTransfer();
      if (file) dataTransfer.items.add(file);
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
    // Give priority to user's onChange -- this allows intercept files input before component process file itself.
    // 컴포넌트 사용자의 onChange를 우선 실행하여 파일 입력을 처리하기 전에 사용자가 가로챌 수 있도록 합니다.
    if (onChange) {
      onChange(evt);
    }
    const file = evt.currentTarget.files?.item(0);
    setInnerFile(file ? file : null);
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
          isDragging && 'border-dashed border-primary text-gray-600',
          innerFile && 'text-gray-600'
        )}
        onClick={() => innerRef.current?.showPicker()}
      >
        <FileText className={cn('text-gray-600', isDragging && 'motion-safe:animate-bounce')} size="32" />
        {isDragging ? '파일을 끌어넣어 추가하기' : (innerFile?.name ?? '파일을 선택해주세요')}
      </div>
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