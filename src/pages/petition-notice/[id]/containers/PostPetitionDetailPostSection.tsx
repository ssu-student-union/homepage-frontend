import { EditButton, ListButton } from '@/components/Buttons/BoardActionButtons';
import { StateTag } from '@/components/StateTag';
import { useResize } from '@/hooks/useResize';
import { Editor, Viewer } from '@toast-ui/react-editor';
import { ThumbsUp } from '@phosphor-icons/react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '@/components/Logo/Logo';
import { PostPetitionDetailHeadSection } from './PostPetitionDetailHeadSection';

const Content = `<h3>청원취지</h3><h6><br></h6><p>청원취지를 작성해주세요.</p><h3><br></h3><h3>청원내용</h3><h6><br></h6><p>청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.</p><h3><br></h3><h3>청원대안</h3><h6><br></h6><p>청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.</p>`;

export function PostPetitionDetailPostSection() {
  const [isEditting, setIsEditting] = useState(false);
  const [likeState, setLikeState] = useState(false);
  const editorRef = useRef<Editor>(null);
  const navigate = useNavigate();
  const { width } = useResize();
  const mobile_screen = width < 391;

  const handleEditContent = () => {
    setIsEditting((prev) => !prev);
  };

  const handleMoveToList = () => {
    navigate('/petition-notice');
  };

  const handleLikeButton = () => {
    setLikeState((prev) => !prev);
  };
  return (
    <>
      <PostPetitionDetailHeadSection />
      <div className="mt-[59px] flex-col px-[200px] xs:px-[35px] sm:px-[35px] md:px-[70px] lg:px-[70px]">
        <div className="flex justify-between gap-10 lg:justify-center">
          <div>
            {isEditting ? (
              <Editor
                ref={editorRef}
                height="620px"
                initialValue={Content}
                previewStyle="vertical"
                initialEditType="wysiwyg"
                useCommandShortcut={true}
                hideModeSwitch={true}
                language="ko-KR"
              />
            ) : (
              <Viewer initialValue={Content} />
            )}
            <div className="mt-[51px] flex justify-start gap-1 text-primary">
              <span className="cursor-pointer" onClick={handleLikeButton}>
                <ThumbsUp size={25} weight={likeState ? 'regular' : 'fill'} />
              </span>
              <span className="cursor-pointer pt-1">32</span>
            </div>
          </div>
          <div className="xs:hidden sm:hidden md:hidden">
            <StateTag current="ANSWERED" />
          </div>
        </div>
        <div className="mt-[60px] flex-col">
          <div className="w-full rounded-[10px] border border-primary bg-gray-50 p-8">
            <div className="mb-2 flex text-lg font-bold xs:text-xs">
              <Logo size={mobile_screen ? '15px' : '26px'} fill="#2F4BF7" />
              <span className="ml-2 text-[#2F4BF7]">중앙운영위원회 공식답변</span>
            </div>
            <p className="text-lg font-medium text-[#7E7E7E] xs:text-xs">
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
            <EditButton onClick={handleEditContent} />
            <ListButton onClick={handleMoveToList} />
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}
