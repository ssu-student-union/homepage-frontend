import { BoardSelector } from '@/components/Board/BoardSelector';
import { Comment } from '@/containers/common/Comment/Comment';
import { TextArea } from '@/containers/common/TextArea/TextArea';
import { useBoardSelect } from '@/hooks/useBoardSelect';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PetitionCommentOrderType } from '../../type';
import { PetitionCommentOrder } from '../../const';

export function PostPetitionDetailCommentSection() {
  const navigate = useNavigate();
  const { selectedSubcategories, onSubcategorySelect } = useBoardSelect<PetitionCommentOrderType>(
    PetitionCommentOrder[0]
  );
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

  return (
    <>
      <div className="mb-[512px] mt-16 px-[200px] xs:px-[35px] sm:px-[35px] md:px-[70px] lg:px-[70px]">
        <div className="mb-[51px] flex items-center justify-between">
          <div className="text-[28px] font-bold xs:text-xl">댓글</div>
          <BoardSelector
            subcategories={PetitionCommentOrder}
            selectedSubcategory={selectedSubcategories}
            onSubcategorySelect={onSubcategorySelect}
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
