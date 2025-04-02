import { BoardSelector } from '@/components/Board/BoardSelector';
import { TextArea } from '@/components/TextArea/TextArea';
import { useBoardSelect } from '@/hooks/useBoardSelect';
import { PetitionCommentOrderType } from '../../type';
import { PetitionCommentOrder } from '../../const';
import { Comment } from '@/components/Comment/Comment';
import { useParams } from 'react-router-dom';
import { useGetBoardPostComment } from '@/hooks/api/get/useGetBoardPostComment';
import { SkeletonComment } from './SkeletonComment';
import { useRecoilValue } from 'recoil';
import { commentLoadingState } from '@/recoil/atoms/atom';

type ParamsType = {
  id: string;
};

export function PostPetitionDetailCommentSection() {
  const { selectedSubcategories, onSubcategorySelect } = useBoardSelect<PetitionCommentOrderType>(
    PetitionCommentOrder[0]
  );
  const { id } = useParams() as ParamsType;

  const { data, isLoading, isFetching } = useGetBoardPostComment({
    postId: Number(id),
    type: selectedSubcategories,
  });

  if (!isFetching) {
    localStorage.setItem('total-comment', JSON.stringify(data?.data.total));
  }

  // 댓글 생성 시 로딩 시간 처리
  const isCommentLoading = useRecoilValue(commentLoadingState);

  return (
    <>
      <div className="mb-[512px] mt-16 px-[35px] md:px-[70px] xl:px-[200px]">
        <div className="mb-[51px] flex items-center justify-between">
          <div className="text-[1.25rem] font-bold sm:text-[1.75rem]">
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
        <TextArea className="w-full" isAuthority={data?.data.allowedAuthorities}>
          {null}
        </TextArea>
        <div className="flex flex-col">
          {localStorage.getItem('total-comment') === '0' ? (
            data?.data.postComments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                authority={data.data.allowedAuthorities}
                className=""
                type={selectedSubcategories}
              />
            ))
          ) : isLoading || isCommentLoading ? (
            <>
              {[...Array(4)].map((_, index) => (
                <SkeletonComment key={index} />
              ))}
            </>
          ) : (
            data?.data.postComments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                authority={data.data.allowedAuthorities}
                className=""
                type={selectedSubcategories}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
