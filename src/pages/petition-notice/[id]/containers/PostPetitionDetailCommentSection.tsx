import { BoardSelector } from '@/components/Board/BoardSelector';
import { RegisterButton } from '@/components/Buttons/BoardActionButtons';
import { Comment } from '@/containers/common/Comment/Comment';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const COMMENT_ORDER = ['최신순', '인기순'];

export function PostPetitionDetailCommentSection() {
  const navigate = useNavigate();

  useEffect(() => {
    window.history.pushState(null, '', window.location.href);

    const handlePopState = () => {
      navigate('/petition-notice');
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  const [searchParams] = useSearchParams();
  const [selectedCommentOrder, setSelectedCommentOrder] = useState(() => {
    return searchParams.get('order') || COMMENT_ORDER[0];
  });
  const [commentCount, setCommentCount] = useState<number | null>(0);

  const handleSortComment = (subcategory: string) => {
    setSelectedCommentOrder(subcategory);
    navigate(`/petition-notice/1/?order=${subcategory}`);
  };

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState('');

  const commentLengthHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentCount(e.target.value.length);
    setText(e.currentTarget.value);

    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };
  return (
    <>
      <div className="mb-[512px] mt-16 px-[200px] xs:px-[35px] sm:px-[35px] md:px-[70px] lg:px-[70px]">
        <div className="mb-[51px] flex items-center justify-between">
          <div className="text-[28px] font-bold xs:text-xl">댓글</div>
          <BoardSelector
            subcategories={COMMENT_ORDER}
            selectedSubcategory={selectedCommentOrder}
            onSubcategorySelect={handleSortComment}
          />
        </div>
        <div className="relative mb-5">
          <textarea
            ref={textareaRef}
            value={text}
            placeholder="댓글을 남겨보세요"
            onChange={commentLengthHandler}
            maxLength={2000}
            className="w-full resize-none overflow-hidden rounded-md border border-gray-500 px-8 py-12 text-lg placeholder:text-lg placeholder:font-medium placeholder:text-gray-400 placeholder:xs:text-xs"
          />
          <div className="absolute bottom-4 right-3 flex justify-center">
            <p className="mr-[26px] pt-[10px] text-lg text-gray-400 xs:text-xs">{commentCount}/2000</p>
            <RegisterButton disabled={commentCount === 0 ? true : false} />
          </div>
        </div>
        <div className="flex flex-col gap-11">
          <Comment />
          <Comment />
          <Comment />
          <Comment />
        </div>
      </div>
    </>
  );
}
