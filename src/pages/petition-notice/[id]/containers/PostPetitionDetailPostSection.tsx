import { DeleteButton, EditButton, ListButton } from '@/components/Buttons/BoardActionButtons';
import { StateTag } from '@/components/StateTag';
import { useResize } from '@/hooks/useResize';
import { Viewer } from '@toast-ui/react-editor';
import { ThumbsUp } from '@phosphor-icons/react';
import { useNavigate, useParams } from 'react-router-dom';
import { Logo } from '@/components/Logo/Logo';
import Breadcrumb from '@/components/Breadcrumb';
import { PostHead } from '@/components/PostHead';
import { useGetBoardDetail } from '@/hooks/useGetBoardDetail';
import { delBoardPosts } from '@/apis/delBoardPosts';
import { usePostPostReaction } from '@/hooks/usePostPostReaction';

type ParamsType = {
  id: string;
};

export function PostPetitionDetailPostSection() {
  const { id } = useParams() as ParamsType;
  const userID = JSON.parse(localStorage.getItem('kakaoData') as string).data.id;
  const breadcrumbItems = new Map<string, string | null>([
    ['소통', null],
    ['청원게시판', '/petition-notice'],
  ]);
  const navigate = useNavigate();
  const { width } = useResize();
  const mobile_screen = width < 391;

  const { isLoading, data } = useGetBoardDetail({
    boardCode: '청원게시판',
    postId: Number(id),
    userId: userID as number,
  });
  console.log(data);

  const replaceSN = (student_number: string, chracter: string) => {
    return student_number.substring(0, 2) + chracter.repeat(4) + student_number.substring(6);
  };

  const handleDeleteContent = async () => {
    const deleteCheck = window.confirm('게시글을 삭제하시겠습니까?');
    if (deleteCheck) {
      await delBoardPosts('청원게시판', data?.data.postDetailResDto.postId!);
      navigate('/petition-notice');
    } else {
      return;
    }
  };

  const handleEditContent = () => {
    localStorage.setItem('edit-post', JSON.stringify(data?.data.postDetailResDto.postId));
    navigate('/petition-notice/edit');
  };

  const handleMoveToList = () => {
    navigate('/petition-notice');
  };

  const mutation = usePostPostReaction();
  const handleLikeButton = async () => {
    const userID = JSON.parse(localStorage.getItem('kakaoData') as string).data.id!;
    const post_reaction = {
      postId: data?.data.postDetailResDto.postId as number,
      userId: Number(userID),
      reaction: 'like',
    };
    try {
      await mutation.mutateAsync(post_reaction);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isLoading ? (
        <div>로딩중</div>
      ) : (
        <>
          <div className="mb-[25px] mt-[182px] px-[200px] xs:px-[35px] sm:px-[35px] md:px-[70px] lg:px-[70px]">
            <Breadcrumb items={breadcrumbItems} />
            <PostHead
              title={`[${data?.data.postDetailResDto.categoryName}] ${data?.data.postDetailResDto.title}`}
              writer={replaceSN(data?.data.postDetailResDto.studentId!, '*')}
              date={data?.data.postDetailResDto.createdAt!}
            />
          </div>
          <hr />
          <div className="mt-[59px] flex-col px-[200px] xs:px-[35px] sm:px-[35px] md:px-[70px] lg:px-[70px]">
            <div className="flex justify-between gap-10 ">
              <div className="w-full">
                <Viewer initialValue={JSON.parse(data?.data.postDetailResDto.content as string)} />
                <div className="mt-[51px] flex justify-start gap-1 text-primary">
                  <span className="cursor-pointer" onClick={handleLikeButton}>
                    <ThumbsUp size={25} weight="regular" />
                  </span>
                  <span className="pt-1">{data?.data.postDetailResDto.likeCount}</span>
                </div>
              </div>
              <div className="xs:hidden sm:hidden md:hidden">
                <StateTag current={data?.data.postDetailResDto.categoryName!} />
              </div>
            </div>
            <div className="mt-[60px] flex-col">
              {data?.data.postDetailResDto.officialCommentList.length === 0 ? null : (
                <div className="w-full rounded-[10px] border border-primary bg-gray-50 p-8">
                  <div className="mb-2 flex text-[1.125rem] font-bold xs:text-[0.75rem]">
                    <Logo size={mobile_screen ? '15px' : '26px'} fill="#2F4BF7" />
                    <span className="ml-2 text-[#2F4BF7]">중앙운영위원회 공식답변</span>
                  </div>
                  <p className="text-[1.125rem] font-medium text-[#7E7E7E] xs:text-[0.75rem]">
                    {data?.data.postDetailResDto.officialCommentList[0].content}
                  </p>
                </div>
              )}
              <div className="mb-[35px] mt-14 flex justify-end gap-4 xs:mt-20 xs:justify-center sm:mt-20">
                {data?.data.postDetailResDto.isAuthor ? <DeleteButton onClick={handleDeleteContent} /> : null}
                {data?.data.postDetailResDto.isAuthor ? <EditButton onClick={handleEditContent} /> : null}
                <ListButton onClick={handleMoveToList} />
              </div>
            </div>
          </div>
          <hr />
        </>
      )}
    </>
  );
}
