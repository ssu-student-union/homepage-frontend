import { Header } from "@/containers/common/Header/Header";
import { Viewer } from "@toast-ui/react-editor";
import { ThumbsUp } from "@phosphor-icons/react";
import {
  EditButton,
  ListButton,
  RegisterButton,
} from "@/components/Buttons/BoardActionButtons";
import { BoardSelector } from "@/components/Board/BoardSelector";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";

const Content =
  "<h3>청원취지</h3><h6><br></h6><p>청원취지를 작성해주세요.</p><h3><br></h3><h3>청원내용</h3><h6><br></h6><p>청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.청원내용을 작성해주세요.</p><h3><br></h3><h3>청원대안</h3><h6><br></h6><p>청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.청원대안을 작성해주세요.</p>";

const COMMENT_ORDER = ["인기순", "최신순"];

export function PetitionNoticeDetailPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [selectedCommentOrder, setSelectedCommentOrder] = useState(() => {
    return searchParams.get("order") || COMMENT_ORDER[0];
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
      <div className="mt-[182px] px-[200px]">
        <div>breadcrumb</div>
        <div>제목제목제목제목제목제목제목제목제목</div>
        <div>2024/07/31</div>
      </div>
      <hr />

      {/* postsection */}
      <div className="flex-col mt-[59px] px-[200px]">
        <div className="flex justify-between gap-10">
          <div className="w-[1000px]">
            <Viewer initialValue={Content} />
            <div className="mt-[51px] flex justify-start text-primary">
              <ThumbsUp size={25} />
              <span>32</span>
            </div>
          </div>
          <div className="w-[140px] h-[266px] border border-black">
            status bar
          </div>
        </div>
        <div className="flex justify-end gap-4 mb-[35px]">
          <EditButton />
          <ListButton />
        </div>
      </div>
      <hr />

      {/* commentsection */}
      <div className="mt-16 mb-[512px] px-[200px]">
        <div className="flex justify-between mb-[51px]">
          <div className="text-[28px] font-bold">댓글</div>
          <BoardSelector
            subcategories={["인기순", "최신순"]}
            selectedSubcategory={selectedCommentOrder}
            onSubcategorySelect={handleSortComment}
          />
        </div>
        <div className="">
          <div className="w-full h-60 bg-gray-50 mb-11">댓글컴포넌트</div>
          <div className="w-full h-60 bg-gray-50 mb-11">댓글컴포넌트</div>
          <div className="w-full h-60 bg-gray-50 mb-11">댓글컴포넌트</div>
          <div className="w-full h-60 bg-gray-50 mb-11">댓글컴포넌트</div>
        </div>
        <div className="relative">
          <Input
            type="text"
            placeholder="댓글을 남겨보세요"
            onChange={commentLengthHandler}
            maxLength={2000}
            className="h-[178px] text-lg placeholder:text-gray-500 placeholder:text-lg placeholder:font-medium"
          />
          <div className="flex justify-center absolute bottom-3 right-3">
            <p className="mr-[26px] pt-[10px]">{commentCount}/2000</p>
            <RegisterButton disabled={commentCount === 0 ? true : false} />
          </div>
        </div>
      </div>
    </div>
  );
}
