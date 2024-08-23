import { DeleteButton, EditButton, ListButton } from '@/components/Buttons/BoardActionButtons';
import { StateTag } from '@/components/StateTag';
import { useResize } from '@/hooks/useResize';
import { Viewer } from '@toast-ui/react-editor';
import { ThumbsUp } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '@/components/Logo/Logo';
import Breadcrumb from '@/components/Breadcrumb';
import { PostHead } from '@/components/PostHead';

const Content = `<h3>청원취지</h3><h6><br></h6><p>청원취지를 작성해주세요.</p><h3><br></h3><h3>청원내용</h3><h6><br></h6><p>청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.</p><h3><br></h3><h3>청원대안</h3><h6><br></h6><p>청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.</p>`;
// const Content = `<p>*글 작성 가이드라인에 맞춰 글을 작성해주시기 바랍니다. 가이드라인을 준수하지 않을 경우, 게시글이 삭제될 수 있습니다.</p><h3><br></h3><h3>청원취지</h3><h6><br></h6><p>청원취지를 작성해주세요.</p><h3><br></h3><h3>청원내용</h3><h6><br></h6><p>청원내용을 작성해주세요.</p><h3><br></h3><h3>청원대안</h3><h6><br></h6><p>청원대안을 작성해주세요.</p><p><br></p><p><img src="https://ssuitsupport.s3.ap-northeast-2.amazonaws.com/%EC%B2%AD%EC%9B%90%EA%B2%8C%EC%8B%9C%ED%8C%90/5/files/a331e09f-4cb5-4e60-8137-1bec4aa863a0.png" alt="alt text" contenteditable="false"><br></p>`;

export function PostPetitionDetailPostSection() {
  const breadcrumbItems = new Map<string, string | null>([
    ['소통', null],
    ['청원게시판', '/petition-notice'],
  ]);
  const navigate = useNavigate();
  const { width } = useResize();
  const mobile_screen = width < 391;

  const handleEditContent = () => {
    navigate('/petition-notice/edit');
  };

  const handleMoveToList = () => {
    navigate('/petition-notice');
  };

  const handleLikeButton = () => {};
  return (
    <>
      <div className="mb-[25px] mt-[182px] px-[200px] xs:px-[35px] sm:px-[35px] md:px-[70px] lg:px-[70px]">
        <Breadcrumb items={breadcrumbItems} />
        <PostHead
          title="[답변완료] 대동체 축제 때 에스파 불러주세요"
          writer="20****03"
          date="2021-11-08T11:44:30.327959"
        />
      </div>
      <hr />
      <div className="mt-[59px] flex-col px-[200px] xs:px-[35px] sm:px-[35px] md:px-[70px] lg:px-[70px]">
        <div className="flex justify-between gap-10 ">
          <div className="w-full">
            <Viewer initialValue={Content} />
            <div className="mt-[51px] flex justify-start gap-1 text-primary">
              <span className="cursor-pointer" onClick={handleLikeButton}>
                <ThumbsUp size={25} weight="regular" />
              </span>
              <span className="pt-1">32</span>
            </div>
          </div>
          <div className="xs:hidden sm:hidden md:hidden">
            <StateTag current="ANSWERED" />
          </div>
        </div>
        <div className="mt-[60px] flex-col">
          <div className="w-full rounded-[10px] border border-primary bg-gray-50 p-8">
            <div className="mb-2 flex text-[1.125rem] font-bold xs:text-[0.75rem]">
              <Logo size={mobile_screen ? '15px' : '26px'} fill="#2F4BF7" />
              <span className="ml-2 text-[#2F4BF7]">중앙운영위원회 공식답변</span>
            </div>
            <p className="text-[1.125rem] font-medium text-[#7E7E7E] xs:text-[0.75rem]">
              와 샌즈! Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
              the industry's standard dummy text ever since the 1500s, when an unknown printer took galley of type and
              scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
              of Letraset sheets containing Lorem Ipsum passages, and more recently with 와 샌즈! Lorem Ipsum is simply
              dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
              text ever since the 1500s, when an unknown printer took galley of type and scrambled it to make a type
              specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
              remaining{' '}
            </p>
          </div>
          <div className="mb-[35px] mt-14 flex justify-end gap-4 xs:mt-20 xs:justify-center sm:mt-20">
            <DeleteButton />
            <EditButton onClick={handleEditContent} />
            <ListButton onClick={handleMoveToList} />
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}
