import { useResize } from '@/hooks/useResize';
import { DotsThree } from '@phosphor-icons/react';
import { ThumbsUp, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { TextArea } from '../TextArea/TextArea';
import { CancelButton } from '@/components/Buttons/BoardActionButtons';
import { postCommentList, postReplyCommentList } from '@/types/getBoardPostComment';
import { cn } from '@/libs/utils';
import { formatYYYYMMDDHHMM } from '@/utils/formatYYYYMMDDHHMM';

interface CommentProps {
  comment?: postCommentList;
  replyComment?: postReplyCommentList;
  className: string;
}

export function Comment({ comment, replyComment, className }: CommentProps) {
  const commentData = comment || replyComment;
  if (!commentData) return null;

  const toggleRef = useRef<HTMLDivElement>(null);
  const [toggleIsOpen, setToggleIsOpen] = useState(false);
  const [replyIsOpen, setReplyIsOpen] = useState(false);

  const { width } = useResize();
  const mobile_screen = width < 391;

  const handleToggle = () => {
    setToggleIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (toggleRef.current && !toggleRef.current.contains(e.target as Node)) {
        setToggleIsOpen(false);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const replaceSN = (student_number: string, chracter: string) => {
    return student_number.substring(0, 2) + chracter.repeat(4) + student_number.substring(6);
  };

  const handleOpenReplyComment = () => {
    setReplyIsOpen(true);
  };

  const handleCloseReplyComment = () => {
    setReplyIsOpen(false);
  };

  return (
    <>
      <div className={cn('mb-8 flex flex-col rounded-[10px] bg-gray-50 px-5 py-[30px]', className)}>
        <div className="flex justify-between text-gray-400">
          <div className="mb-[9px] flex gap-4">
            <span>
              <User size={mobile_screen ? '14px' : '24px'} />
            </span>
            <div className="text-[1.125rem] font-medium xs:text-[0.75rem]">
              {replaceSN(commentData.authorName, '*')}
            </div>
          </div>
          <div className="relative" ref={toggleRef}>
            <span className="cursor-pointer" onClick={handleToggle}>
              <DotsThree size={mobile_screen ? '13px' : '20px'} weight="bold" />
            </span>
            <div className="absolute right-0 z-10">
              {toggleIsOpen ? (
                <div className="flex w-[120px] cursor-pointer flex-col items-center justify-center rounded-[7px] bg-gray-50 drop-shadow-xl xs:w-[100px]">
                  <ul className="w-full text-[0.938rem] font-medium text-[#374151] xs:text-[0.563rem] ">
                    <li className="px-[34px] py-[6px] text-center hover:bg-gray-100 xs:px-[20px]">삭제하기</li>
                    <li className="px-[34px] py-[6px] text-center hover:bg-gray-100 xs:px-[20px]">수정하기</li>
                  </ul>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
        <div className="mb-[11px] text-[1.125rem] font-medium text-gray-500 xs:text-[0.75rem]">
          {commentData.content}
        </div>
        <div className="flex justify-start gap-4 text-[1rem] font-medium text-gray-400 xs:text-[0.75rem]">
          <div>{formatYYYYMMDDHHMM(commentData.createdAt)}</div>
          <div className="cursor-pointer whitespace-nowrap" onClick={handleOpenReplyComment}>
            {comment && '답글쓰기'}
          </div>
          <div className="flex gap-[3px] text-primary">
            <span className="cursor-pointer">
              <ThumbsUp size={mobile_screen ? '13px' : '19px'} />
            </span>
            <span className="pt-[1px] xs:pt-0">{commentData.likeCount}</span>
          </div>
        </div>
      </div>
      {replyIsOpen && (
        <TextArea className="ml-10 w-full">
          <CancelButton onClick={handleCloseReplyComment} />
        </TextArea>
      )}
      {comment &&
        comment.postReplyComments.map((replyComment) => (
          <Comment replyComment={replyComment} key={replyComment.id} className="ml-10" />
        ))}
    </>
  );
}
