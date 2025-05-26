import CommentMark from '@/assets/image/comentMark.svg';
import { PostListResDto } from '@/types/apis/get';
import { Link } from 'react-router';
interface MyPostsContentProps {
  data: PostListResDto;
}
const boardRoutes = {
  질의응답게시판: '/qna',
  공지사항게시판: '/notice',
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
  const basePath = boardRoutes[data.boardCode as keyof typeof boardRoutes];

  return (
    <div className="mx-16 mt-4 flex flex-col border-b border-solid border-gray-400 pr-2 text-[14px]">
      <div className="xs:flex-col xs:items-end flex cursor-pointer flex-row justify-between">
        <div className="flex items-center">
          <div className="ml-3 h-5 w-12 text-[#2F4BF7]">{data.postId.toString()}</div>
          {basePath ? (
            <Link to={`${basePath}/${data.postId}`} className="text-[#374151] hover:underline">
              [{data.boardCode}] {data.title}
            </Link>
          ) : (
            <span className="text-[#374151]">
              [{data.boardCode}] {data.title}
            </span>
          )}
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
