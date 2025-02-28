import { ChangeEvent, RefObject, useEffect, useRef, useState } from 'react';
import { cn } from '@/libs/utils.ts';
import { Button } from '@/components/ui/button.tsx';
import { Loader2 } from 'lucide-react';

interface PostCommentEditorProps {
  value?: string;
  placeholder?: string;
  className?: string;
  maxLength?: number;
  editing?: boolean;
  uploading?: boolean;
  onSubmit?: (value: string) => void;
  onCancel?: () => void;
}

export function PostCommentEditor({
  value,
  placeholder,
  className,
  maxLength,
  editing,
  uploading,
  onSubmit,
  onCancel,
}: PostCommentEditorProps) {
  const [innerValue, setInnerValue] = useState('');
  const ref: RefObject<HTMLTextAreaElement> = useRef(null);
  useEffect(() => {
    setInnerValue(value ?? '');
  }, [value]);
  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = `${ref.current?.scrollHeight}px`;
    }
  }, [innerValue]);

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setInnerValue(e.target.value);
  }

  function handleClick() {
    onSubmit?.(innerValue);
    setInnerValue('');
  }

  return (
    <section
      className={cn(
        'flex flex-col gap-2 rounded-md border border-gray-500 p-8 outline outline-1 outline-transparent transition-all focus-within:outline-primary',
        className
      )}
    >
      <textarea
        ref={ref}
        className="h-auto resize-none bg-transparent placeholder:text-gray-500 focus:outline-none focus-visible:outline-none"
        value={innerValue}
        placeholder={placeholder}
        onChange={handleChange}
        maxLength={maxLength}
      ></textarea>
      <div className="flex items-center justify-end gap-2">
        {maxLength && (
          <p className="mr-4 text-gray-400">
            {innerValue.length}/{maxLength}
          </p>
        )}
        {editing && (
          <Button variant="outline" className="rounded-[7px] text-lg" onClick={onCancel} disabled={uploading}>
            취소
          </Button>
        )}
        <Button
          variant="Register"
          className={cn('flex items-center justify-center gap-1')}
          disabled={innerValue.length < 1 || uploading}
          onClick={handleClick}
        >
          <Loader2 className={cn('animate-spin transition-all', uploading ? 'ml-0 opacity-100' : '-ml-7 opacity-0')} />
          <p>{editing ? '수정' : '작성'}</p>
        </Button>
      </div>
    </section>
  );
}
