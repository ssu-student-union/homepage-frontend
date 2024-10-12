import { CancelButton, RegisterButton } from '@/components/Buttons/BoardActionButtons.tsx';
import { RefObject, useEffect, useRef, useState } from 'react';
import { cn } from '@/libs/utils.ts';

interface PostCommentEditorProps {
  value?: string;
  placeholder?: string;
  className?: string;
  maxLength?: number;
  editing?: boolean;
  onSubmit?: (value: string) => void;
  onCancel?: () => void;
}

export function PostCommentEditor({
  value,
  placeholder,
  className,
  maxLength,
  editing,
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
  return (
    <section
      className={cn(
        'flex flex-col gap-2 rounded-md border border-gray-500 p-8 outline outline-1 outline-transparent transition-all focus-within:outline-primary',
        className
      )}
    >
      <textarea
        ref={ref}
        className="h-auto resize-none placeholder:text-gray-500 focus:outline-none focus-visible:outline-none"
        value={innerValue}
        placeholder={placeholder}
        onChange={(e) => setInnerValue(e.target.value)}
        maxLength={maxLength}
      ></textarea>
      <div className="flex items-center justify-end gap-6">
        {maxLength && (
          <p className="text-gray-400">
            {innerValue.length}/{maxLength}
          </p>
        )}
        <RegisterButton disabled={innerValue.length < 1} onClick={() => onSubmit?.(innerValue)} />
        {editing && <CancelButton onClick={onCancel} />}
      </div>
    </section>
  );
}
