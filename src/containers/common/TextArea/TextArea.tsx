import { RegisterButton } from '@/components/Buttons/BoardActionButtons';
import { useRef, useState } from 'react';

interface TextAreaProps {
  children: React.ReactNode;
}

export function TextArea({ children }: TextAreaProps) {
  const [commentCount, setCommentCount] = useState<number | null>(0);
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const commentLengthHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentCount(e.target.value.length);
    setText(e.currentTarget.value);

    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };
  return (
    <div className="relative mb-5">
      <textarea
        ref={textareaRef}
        value={text}
        placeholder="댓글을 남겨보세요"
        onChange={commentLengthHandler}
        maxLength={2000}
        className="w-full resize-none overflow-hidden rounded-md border border-gray-500 px-8 py-12 text-lg placeholder:text-lg placeholder:font-medium placeholder:text-gray-400 placeholder:xs:text-xs"
      />
      <div className="absolute bottom-4 right-3 flex justify-center gap-1">
        <p className="mr-[15px] pt-[10px] text-lg text-gray-400 xs:text-xs">{commentCount}/2000</p>
        <>{children}</>
        <RegisterButton disabled={commentCount === 0 ? true : false} />
      </div>
    </div>
  );
}
