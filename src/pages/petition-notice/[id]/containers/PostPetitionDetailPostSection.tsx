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
import { usePostPostReaction } from '@/hooks/usePostPostReaction';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useDelBoardPosts } from '@/hooks/useDelBoardPosts';

type ParamsType = {
  id: string;
};

export function PostPetitionDetailPostSection() {
  const { id } = useParams() as ParamsType;

  const breadcrumbItems = new Map<string, string | null>([
    ['소통', null],
    ['청원게시판', '/petition-notice'],
  ]);

  const navigate = useNavigate();

  const { width } = useResize();
  const mobile_screen = width < 391;

  const queryClient = useQueryClient();
  const { isLoading, data, refetch } = useGetBoardDetail({
    boardCode: '청원게시판',
    postId: Number(id),
  });

  useEffect(() => {
    if (!queryClient.getQueryData(['get-board-boardCode-posts-postId'])) {
      refetch();
    }
  }, [queryClient, refetch]);

  const replaceSN = (student_number: string | null, chracter: string) => {
    return student_number!.substring(0, 2) + chracter.repeat(4) + student_number!.substring(6);
  };
  const { mutate } = useDelBoardPosts();
  const handleDeleteContent = async () => {
    const deleteCheck = window.confirm('게시글을 삭제하시겠습니까?');
    if (deleteCheck) {
      mutate({
        boardCode: '청원게시판',
        postId: data?.data.postDetailResDto.postId as number,
        fileurl: data?.data.postDetailResDto.imageList ?? [],
      });
      navigate('/petition-notice');
    } else {
      return;
    }
  };

  const handleEditContent = () => {
    localStorage.setItem('oldContent', JSON.stringify(data?.data));
    navigate('/petition-notice/edit');
  };

  const handleMoveToList = () => {
    navigate('/petition-notice');
  };

  const mutation = usePostPostReaction();

  const [animate, setAnimate] = useState(false);

  const handleLikeButton = async () => {
    if (!localStorage.getItem('accessToken')) {
      const check = window.confirm('로그인 회원만 사용 가능한 기능입니다!');
      if (check) {
        navigate('/register');
      } else {
        return;
      }
    } else {
      if (!data?.data.postDetailResDto.canAuthority.includes('REACTION')) {
        alert('자치기구는 청원 게시물에 대한 좋아요 권한이 없습니다.');
      } else {
        const post_reaction = {
          postId: data?.data.postDetailResDto.postId || null,
          reaction: 'like',
        };
        try {
          if (!data?.data.postDetailResDto.isLiked) {
            setAnimate(true);
            setTimeout(() => setAnimate(false), 500);
          }
          await mutation.mutateAsync(post_reaction);
        } catch (err) {
          console.log(err);
        }
      }
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
              writer={
                data?.data.postDetailResDto.studentId === null
                  ? data.data.postDetailResDto.authorName
                  : replaceSN(data?.data.postDetailResDto.studentId || null, '*')
              }
              date={
                data?.data.postDetailResDto.lastEditedAt || null
                  ? data?.data.postDetailResDto.lastEditedAt || null
                  : data?.data.postDetailResDto.createdAt || null
              }
            />
          </div>
          <hr />
          <div className="mt-[59px] flex-col px-[200px] xs:px-[35px] sm:px-[35px] md:px-[70px] lg:px-[70px]">
            <div className="flex justify-between gap-10 ">
              <div className="w-full">
                <Viewer initialValue={JSON.parse(data?.data.postDetailResDto.content as string)} />
                <div className="mt-[51px] flex justify-start gap-1 text-primary">
                  <span className={`cursor-pointer ${animate ? 'animate-sparkle' : ''}`} onClick={handleLikeButton}>
                    <ThumbsUp size={25} weight={data?.data.postDetailResDto.isLiked ? 'fill' : 'regular'} />
                  </span>
                  <span className="pt-1">{data?.data.postDetailResDto.likeCount}</span>
                </div>
              </div>
              <div className="xs:hidden sm:hidden md:hidden">
                <StateTag current={data?.data.postDetailResDto.categoryName || null} />
              </div>
            </div>
            <div className="mt-[60px] flex-col">
              {data?.data.postDetailResDto.officialCommentList.length === 0 ? null : (
                <>
                  {data?.data.postDetailResDto.officialCommentList.map((official_comment) => (
                    <div
                      className="mb-5 w-full rounded-[10px] border border-primary bg-gray-50 p-8"
                      key={official_comment.id}
                    >
                      <div className="mb-2 flex text-[1.125rem] font-bold xs:text-[0.75rem]">
                        <Logo size={mobile_screen ? '15px' : '26px'} fill="#2F4BF7" />
                        <span className="ml-2 text-[#2F4BF7]">{official_comment.authorName} 공식답변</span>
                      </div>
                      <p className="text-[1.125rem] font-medium text-[#7E7E7E] xs:text-[0.75rem]">
                        {official_comment.content}
                      </p>
                    </div>
                  ))}
                </>
              )}
              <div className="mb-[35px] mt-14 flex justify-end gap-4 xs:mt-20 xs:justify-center sm:mt-20">
                {data?.data.postDetailResDto.isAuthor || data?.data.postDetailResDto.canAuthority.includes('DELETE') ? (
                  <DeleteButton onClick={handleDeleteContent} />
                ) : null}
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
