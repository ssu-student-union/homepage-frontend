import React, { useRef, useState, useEffect } from 'react';
import { RegisterButton, CancelButton } from '@/components/Buttons/BoardActionButtons';
import { usePatchBoardPostsComment, usePatchBoardPostsReplyComment } from '@/hooks/usePatchBoardPostComment';
import { usePostBoardPostComment, usePostBoardPostReplyComment } from '@/hooks/usePostBoardPostComment';
import { cn } from '@/libs/utils';
import { useNavigate, useParams } from 'react-router-dom';
import { TextAreaProps } from './types';

type ParamsType = {
  id: string;
};

export function TextArea({
  children,
  className,
  isReply = false,
  isEdit = false,
  commentId,
  replycommentId,
  onReplySuccess,
  onEditSuccess,
  onCancel,
  value = '',
  comment_count = 0,
}: TextAreaProps) {
  const { id } = useParams() as ParamsType;
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [commentCount, setCommentCount] = useState<number>(comment_count);
  const [text, setText] = useState(value);
  const navigate = useNavigate();

  const postBoardCommentMutation = usePostBoardPostComment();
  const postBoardReplyCommentMutation = usePostBoardPostReplyComment();
  const patchBoardCommentMutation = usePatchBoardPostsComment();
  const patchBoardReplyCommentMutation = usePatchBoardPostsReplyComment();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  const commentLengthHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentCount(e.target.value.length);
    setText(e.target.value);
  };

  const registerComment = async () => {
    if (!localStorage.getItem('kakaoData')) {
      const check = window.confirm('로그인 회원만 사용 가능한 기능입니다!');
      if (check) {
        navigate('/homepage-frontend');
      } else {
        return;
      }
    } else {
      try {
        if (!isEdit) {
          if (!isReply) {
            await postBoardCommentMutation.mutateAsync({ postId: Number(id), content: text });
          } else {
            await postBoardReplyCommentMutation.mutateAsync({ commentId: commentId!, content: text });
          }
          if (onReplySuccess) onReplySuccess();
        } else {
          if (!isReply) {
            await patchBoardCommentMutation.mutateAsync({ commentId: commentId!, content: text });
          } else {
            await patchBoardReplyCommentMutation.mutateAsync({
              replycommentId: replycommentId!,
              content: text,
            });
          }
          if (onEditSuccess) onEditSuccess(text);
        }
        setText('');
        setCommentCount(0);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="relative mb-5 flex justify-end">
      <textarea
        ref={textareaRef}
        value={text}
        placeholder="댓글을 남겨보세요"
        onChange={commentLengthHandler}
        maxLength={2000}
        className={cn(
          'resize-none overflow-hidden rounded-md border border-gray-500 px-8 py-12 text-[1.125rem] placeholder:text-[1.125rem] placeholder:font-medium placeholder:text-gray-400 placeholder:xs:text-[0.75rem]',
          className
        )}
      />
      <div className="absolute bottom-4 right-3 flex justify-center gap-1">
        <p className="mr-[15px] pt-[10px] text-[1.125rem] text-gray-400 xs:text-[0.75rem]">{commentCount}/2000</p>
        {children}
        <RegisterButton disabled={commentCount === 0} onClick={registerComment} />
        {isEdit && <CancelButton onClick={onCancel} />}
      </div>
    </div>
  );
}
