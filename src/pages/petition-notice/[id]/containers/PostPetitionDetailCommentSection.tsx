import { BoardSelector } from '@/components/Board/BoardSelector';
import { RegisterButton } from '@/components/Buttons/BoardActionButtons';
import { useResize } from '@/hooks/useResize';
import { DotsThree } from '@phosphor-icons/react';
import { ThumbsUp, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const COMMENT_ORDER = ['최신순', '인기순'];

export function PostPetitionDetailCommentSection() {
  const navigate = useNavigate();
  const { width } = useResize();
  const mobile_screen = width < 391;

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
        <div>
          <div className="flex flex-col rounded-[10px] bg-gray-50 px-5 py-[30px]">
            <div className="flex justify-between text-gray-400">
              <div className="mb-[9px] flex gap-4">
                <span>
                  <User size={mobile_screen ? '14px' : '24px'} />
                </span>
                <div className="text-lg font-medium xs:text-xs">20193003</div>
              </div>
              <span className="cursor-pointer">
                <DotsThree size={mobile_screen ? '13px' : '20px'} weight="bold" />
              </span>
            </div>
            <div className="mb-[11px] text-lg font-medium text-gray-500 xs:text-xs">
              와 샌즈! Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
              the industry's standard dummy text ever since the 1500s, when an unknown printer took galley of type and
            </div>
            <div className="flex justify-start gap-4 text-base font-medium text-gray-400 xs:text-xs">
              <div>2024/08/15 01:30</div>
              <div className="cursor-pointer whitespace-nowrap">답글쓰기</div>
              <div className="flex gap-[3px] text-primary">
                <span className="cursor-pointer">
                  <ThumbsUp size={mobile_screen ? '13px' : '23px'} />
                </span>
                <span className="pt-[1px] xs:pt-0">32</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
