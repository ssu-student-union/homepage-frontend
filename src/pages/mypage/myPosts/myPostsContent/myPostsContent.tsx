import CommentMark from '@/assets/image/comentMark.svg';
import { PostListResDto } from '@/types/apis/get';
import { useNavigate } from 'react-router-dom';
interface MyPostsContentProps {
  data: PostListResDto;
}
const boardRoutes: { [key: string]: string } = {
  질의응답게시판: '/qna',
  공지사항: '/notice',
  제휴게시판: '/partnership',
  분실물게시판: '/lost-article',
  학생자치기구: '/petition-notice',
  인권신고게시판: '/human-rights',
  건의게시판: '/sug-notice',
  자료집게시판: '/data',
  감사게시판: '/audit',
  서비스공지사항: '/service-notice',
};

export function MyPostsContent({ data }: MyPostsContentProps) {
  const navigate = useNavigate();

  const onClickMyPost = () => {
    const basePath = boardRoutes[data.boardCode];
    if (basePath) {
      navigate(`${basePath}/${data.postId}`);
    } else {
      console.error(`Invalid boardCode: ${data.boardCode}`);
    }
  };

  return (
    <div className="mx-16 mt-[14px] flex flex-col border-b-[1px] border-solid border-gray-400 pr-2 text-[14px]">
      <div className="flex cursor-pointer flex-row justify-between xs:flex-col xs:items-end">
        <div className="flex items-center">
          <div className="ml-[10px] h-[20px] w-[52px] text-[#2F4BF7]">{data.postId.toString()}</div>
          <div className="text-[#374151]" onClick={onClickMyPost}>
            [{data.boardCode}] {data.title}
          </div>
        </div>
        <div className="self-end font-[400] text-[#6B7280]">{data.date}</div>
      </div>
      <div className="mb-3 flex flex-col items-end">
        <div className="flex gap-1 text-[#2F4BF7]">
          <img src={CommentMark} className="size-4" />
          {data.commentCount}
        </div>
      </div>
    </div>
  );
}
