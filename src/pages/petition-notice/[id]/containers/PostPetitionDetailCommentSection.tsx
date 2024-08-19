import { BoardSelector } from '@/components/Board/BoardSelector';
import { Comment } from '@/containers/common/Comment/Comment';
import { TextArea } from '@/containers/common/TextArea/TextArea';
import { useEffect, useState } from 'react';
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

  const handleSortComment = (subcategory: string) => {
    setSelectedCommentOrder(subcategory);
    navigate(`/petition-notice/1/?order=${subcategory}`);
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
        <TextArea>{null}</TextArea>
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
