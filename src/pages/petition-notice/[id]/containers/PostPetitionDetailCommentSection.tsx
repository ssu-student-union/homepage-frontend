import { BoardSelector } from '@/components/Board/BoardSelector';
import { TextArea } from '@/components/TextArea/TextArea';
import { useBoardSelect } from '@/hooks/useBoardSelect';
import { PetitionCommentOrderType } from '../../type';
import { PetitionCommentOrder } from '../../const';
import { Comment } from '@/components/Comment/Comment';
import { useParams } from 'react-router-dom';
import { useGetBoardPostComment } from '@/hooks/useGetBoardPostComment';
import { SkeletonComment } from './SkeletonComment';

type ParamsType = {
  id: string;
};

export function PostPetitionDetailCommentSection() {
  const { selectedSubcategories, onSubcategorySelect } = useBoardSelect<PetitionCommentOrderType>(
    PetitionCommentOrder[0]
  );
  const { id } = useParams() as ParamsType;
  const userID = (() => {
    try {
      const kakaoData = localStorage.getItem('kakaoData');
      return kakaoData ? (JSON.parse(kakaoData)?.data?.id ?? null) : null;
    } catch (err) {
      console.log(err);
    }
  })();

  const { data, isLoading, isFetching } = useGetBoardPostComment({
    postId: Number(id),
    type: selectedSubcategories,
    userId: Number(userID),
  });

  if (!isFetching) {
    localStorage.setItem('total-comment', JSON.stringify(data?.data.total));
  }

  return (
    <>
      <div className="mb-[512px] mt-16 px-[200px] xs:px-[35px] sm:px-[35px] md:px-[70px] lg:px-[70px]">
        <div className="mb-[51px] flex items-center justify-between">
          <div className="text-[1.75rem] font-bold xs:text-[1.25rem]">
            댓글
            <span className="ml-3 text-primary">
              {localStorage.getItem('total-comment') ? localStorage.getItem('total-comment') : data?.data.total}
            </span>
          </div>
          <BoardSelector
            subcategories={PetitionCommentOrder}
            selectedSubcategory={selectedSubcategories}
            onSubcategorySelect={onSubcategorySelect}
          />
        </div>
        <TextArea className="w-full">{null}</TextArea>
        <div className="flex flex-col">
          {localStorage.getItem('total-comment') === '0' ? (
            data?.data.postComments.map((comment) => <Comment comment={comment} key={comment.id} className="" />)
          ) : isLoading ? (
            <>
              {[...Array(4)].map((_, index) => (
                <SkeletonComment key={index} />
              ))}
            </>
          ) : (
            data?.data.postComments.map((comment) => <Comment comment={comment} key={comment.id} className="" />)
          )}
        </div>
      </div>
    </>
  );
}
