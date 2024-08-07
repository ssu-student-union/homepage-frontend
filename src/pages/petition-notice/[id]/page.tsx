import { Header } from '@/containers/common/Header/Header';
import { Editor, Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { ThumbsUp } from '@phosphor-icons/react';
import { EditButton, ListButton, RegisterButton } from '@/components/Buttons/BoardActionButtons';
import { BoardSelector } from '@/components/Board/BoardSelector';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import Breadcrumb from '@/components/Breadcrumb';
import { PostHead } from '@/components/PostHead';
import { StateTag } from '@/components/StateTag';
import { Logo } from '@/components/Logo/Logo';

const Content = `<h3>청원취지</h3><h6><br></h6><p>청원취지를 작성해주세요.</p><h3><br></h3><h3>청원내용</h3><h6><br></h6><p>청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.</p><h3><br></h3><h3>청원대안</h3><h6><br></h6><p>청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.</p>`;

const COMMENT_ORDER = ['최신순', '인기순'];

export function PetitionNoticeDetailPage() {
  const navigate = useNavigate();

  const breadcrumbItems = new Map<string, string | null>([
    ['소통', null],
    ['청원게시판', '/petition-notice'],
  ]);

  const [isEditting, setIsEditting] = useState(false);
  const [likeState, setLikeState] = useState(false);
  const editorRef = useRef<Editor>(null);

  const handleEditContent = () => {
    setIsEditting((prev) => !prev);
  };

  const handleMoveToList = () => {
    navigate('/petition-notice');
  };

  const handleLikeButton = () => {
    setLikeState((prev) => !prev);
  };

  const [searchParams] = useSearchParams();
  const [selectedCommentOrder, setSelectedCommentOrder] = useState(() => {
    return searchParams.get('order') || COMMENT_ORDER[0];
  });
  const [commentCount, setCommentCount] = useState<number | null>(0);

  useEffect(() => {
    navigate(`/petition-notice/1/?order=${selectedCommentOrder}`);
  }, [selectedCommentOrder, navigate]);

  const handleSortComment = (subcategory: string) => {
    setSelectedCommentOrder(subcategory);
  };

  const commentLengthHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentCount(e.target.value.length);
  };

  return (
    <div>
      <Header />
      {/* headsection */}
      <div className="mb-[25px] mt-[182px] px-[200px] xs:px-[35px] sm:px-[35px] md:px-[70px] lg:px-[70px]">
        <Breadcrumb items={breadcrumbItems} />
        <PostHead
          title="[답변완료] 대동체 축제 때 에스파 불러주세요"
          writer="20****03"
          date="2021-11-08T11:44:30.327959"
        />
      </div>
      <hr />

      {/* postsection */}
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
            <div className="mb-2 flex text-lg font-bold">
              <Logo size="26px" fill="#2F4BF7" />
              <span className="ml-2 text-[#2F4BF7]">중앙운영위원회 공식답변</span>
            </div>
            <p className="text-lg font-medium text-[#7E7E7E]">
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
          <div className="mb-[35px] mt-14 flex justify-end gap-4 xs:mt-20 sm:mt-20">
            <EditButton onClick={handleEditContent} />
            <ListButton onClick={handleMoveToList} />
          </div>
        </div>
      </div>
      <hr />

      {/* commentsection */}
      <div className="mb-[512px] mt-16 px-[200px] xs:px-[35px] sm:px-[35px] md:px-[70px] lg:px-[70px]">
        <div className="mb-[51px] flex justify-between">
          <div className="text-[28px] font-bold">댓글</div>
          <BoardSelector
            subcategories={COMMENT_ORDER}
            selectedSubcategory={selectedCommentOrder}
            onSubcategorySelect={handleSortComment}
          />
        </div>
        <div className="relative">
          <Input
            type="text"
            placeholder="댓글을 남겨보세요"
            onChange={commentLengthHandler}
            maxLength={2000}
            className="h-[178px] text-lg placeholder:text-lg placeholder:font-medium placeholder:text-gray-500"
          />
          <div className="absolute bottom-3 right-3 flex justify-center">
            <p className="mr-[26px] pt-[10px]">{commentCount}/2000</p>
            <RegisterButton disabled={commentCount === 0 ? true : false} />
          </div>
        </div>
      </div>
    </div>
  );
}
