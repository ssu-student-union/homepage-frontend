import { useState, useRef, useEffect } from 'react';
import { DotsThree, ThumbsUp, User } from '@phosphor-icons/react';
import { TextArea } from '../TextArea/TextArea';
import { CancelButton } from '@/components/Buttons/BoardActionButtons';
import { CommentProps } from './types';
import { cn } from '@/libs/utils';
import { formatYYYYMMDDHHMM } from '@/utils/formatYYYYMMDDHHMM';
import { useDelBoardPostComment, useDelBoardPostReplyComment } from '@/hooks/useDelBoardPostComment';
import { useResize } from '@/hooks/useResize';
import { usePostPostCommentReaction, usePostPostReplyCommentReaction } from '@/hooks/usePostPostCommentReaction';
import { useNavigate } from 'react-router-dom';

export function Comment({ comment, replyComment, className, isReply = false, commentId, type }: CommentProps) {
  const commentData = comment || replyComment;

  const [toggleIsOpen, setToggleIsOpen] = useState(false);
  const [replyIsOpen, setReplyIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(commentData!.content);
  const [likeCount, setLikeCount] = useState(commentData?.likeCount);
  const [isLiked, setIsLiked] = useState(commentData?.isLiked);
  const [animate, setAnimate] = useState(false);

  const toggleRef = useRef<HTMLDivElement>(null);
  const commentRef = useRef<HTMLDivElement>(null);

  const { width } = useResize();
  const mobile_screen = width < 391;

  const navigate = useNavigate();

  const delCommentMutation = useDelBoardPostComment();
  const delReplyCommentMutation = useDelBoardPostReplyComment();

  const handleToggle = () => {
    setToggleIsOpen((prev) => !prev);
  };

  const handleDeleteComment = async () => {
    setToggleIsOpen(false);
    if (!isReply) {
      try {
        await delCommentMutation.mutateAsync(comment?.id!);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await delReplyCommentMutation.mutateAsync(replyComment?.id!);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const replaceSN = (student_number: string, chracter: string) => {
    return student_number.substring(0, 2) + chracter.repeat(4) + student_number.substring(6);
  };

  const handleEditComment = () => {
    setIsEditing(true);
    setToggleIsOpen(false);
  };

  const handleEditSuccess = (newContent: string) => {
    setEditContent(newContent);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleOpenReplyComment = () => {
    setReplyIsOpen(true);
  };

  const postCommentReactionMutation = usePostPostCommentReaction(type!);
  const postReplyCommentReactionMutation = usePostPostReplyCommentReaction();

  const handleLikeButton = async () => {
    if (!localStorage.getItem('kakaoData')) {
      const check = window.confirm('로그인 회원만 사용 가능한 기능입니다!');
      if (check) {
        navigate('/homepage-frontend/register');
      } else {
        return;
      }
    } else {
      if (!isReply) {
        const post_comment_reaction = {
          commentId: comment?.id!,
          reaction: 'like',
        };
        try {
          if (!isLiked) {
            setAnimate(true);
            setTimeout(() => setAnimate(false), 500);
          }

          const response = await postCommentReactionMutation.mutateAsync(post_comment_reaction);
          setLikeCount(response.data.likeCount);
          setIsLiked((prev) => !prev);
        } catch (err) {
          console.log(err);
        }
      } else {
        const post_reply_comment_reaction = {
          replycommentId: replyComment?.id!,
          reaction: 'like',
        };
        try {
          if (!replyComment?.isLiked) {
            setAnimate(true);
            setTimeout(() => setAnimate(false), 500);
          }
          await postReplyCommentReactionMutation.mutateAsync(post_reply_comment_reaction);
          setIsLiked((prev) => !prev);
        } catch (err) {
          console.log(err);
        }
      }
    }
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

  return (
    <>
      <div ref={commentRef} className={cn('mb-8 flex flex-col rounded-[10px] bg-gray-50 px-5 py-[30px]', className)}>
        {isEditing ? (
          <TextArea
            value={editContent}
            comment_count={editContent.length}
            className="w-full"
            isReply={isReply}
            isEdit={true}
            commentId={comment?.id}
            replycommentId={replyComment?.id}
            onEditSuccess={handleEditSuccess}
            onCancel={handleCancelEdit}
          />
        ) : (
          <>
            <div className="flex justify-between text-gray-400">
              <div className="mb-[9px] flex gap-4">
                <span>
                  <User size={mobile_screen ? '14px' : '24px'} />
                </span>
                <div className="text-[1.125rem] font-medium xs:text-[0.75rem]">
                  {commentData!.isDeleted
                    ? commentData!.studentId
                    : commentData?.studentId === null
                      ? commentData.authorName
                      : replaceSN(commentData!.studentId, '*')}
                </div>
              </div>
              <div className="relative" ref={toggleRef}>
                {commentData!.isAuthor && !commentData!.isDeleted ? (
                  <span className="cursor-pointer" onClick={handleToggle}>
                    <DotsThree size={mobile_screen ? '13px' : '20px'} weight="bold" />
                  </span>
                ) : null}

                <div className="absolute right-0 z-10">
                  {toggleIsOpen ? (
                    <div className="flex w-[120px] cursor-pointer flex-col items-center justify-center rounded-[7px] bg-gray-50 drop-shadow-xl xs:w-[100px]">
                      <ul className="w-full text-[0.938rem] font-medium text-[#374151] xs:text-[0.563rem] ">
                        <li
                          className="px-[34px] py-[6px] text-center hover:bg-gray-100 xs:px-[20px]"
                          onClick={handleDeleteComment}
                        >
                          삭제하기
                        </li>
                        <li
                          className="px-[34px] py-[6px] text-center hover:bg-gray-100 xs:px-[20px]"
                          onClick={handleEditComment}
                        >
                          수정하기
                        </li>
                      </ul>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
            <div className="mb-[11px] text-[1.125rem] font-medium text-gray-500 xs:text-[0.75rem]">
              {commentData!.content}
            </div>
            <div className="flex justify-start gap-4 text-[1rem] font-medium text-gray-400 xs:text-[0.75rem]">
              <div>
                {commentData!.isDeleted ||
                  (commentData?.lastEditedAt ? (
                    <>
                      {formatYYYYMMDDHHMM(commentData!.lastEditedAt!)}
                      <span className="ml-1">(수정됨)</span>
                    </>
                  ) : (
                    formatYYYYMMDDHHMM(commentData!.createdAt)
                  ))}
              </div>
              <div className="cursor-pointer whitespace-nowrap" onClick={handleOpenReplyComment}>
                {commentData!.isDeleted || (comment && '답글쓰기')}
              </div>
              {commentData!.isDeleted ? null : (
                <div className="flex gap-[3px] text-primary">
                  <span className={`cursor-pointer ${animate ? 'animate-sparkle' : ''}`} onClick={handleLikeButton}>
                    <ThumbsUp size={mobile_screen ? '13px' : '19px'} weight={isLiked ? 'fill' : 'regular'} />
                  </span>
                  <span className="pt-[1px] xs:pt-0">{isReply ? commentData?.likeCount : likeCount}</span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      {replyIsOpen && (
        <TextArea
          className="ml-10 w-full"
          isReply={true}
          commentId={comment?.id}
          replycommentId={replyComment?.id}
          onReplySuccess={() => setReplyIsOpen(false)}
        >
          <CancelButton onClick={() => setReplyIsOpen(false)} />
        </TextArea>
      )}
      {comment &&
        comment.postReplyComments.map((replyComment) => (
          <Comment
            replyComment={replyComment}
            key={replyComment.id}
            commentId={commentId}
            className="ml-10"
            isReply={true}
          />
        ))}
    </>
  );
}
