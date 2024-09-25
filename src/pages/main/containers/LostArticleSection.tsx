import { Size } from '@/components/PostCard/const/state';
import { PostCardMissing } from '@/components/PostCard/PostCardBasicMissing';
import { Spacing } from '@/components/Spacing';
import { useGetBoardPosts } from '@/hooks/useGetBoardPosts';
import { useResize } from '@/hooks/useResize';
import { GetLostArticlePostsResponse } from '@/types/getBoardPosts';
import { formatYYYYMMDDHHMM } from '@/utils/formatYYYYMMDDHHMM';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LostArticleSection = () => {
  const { width } = useResize();
  const { data } = useGetBoardPosts<GetLostArticlePostsResponse>({
    boardCode: '분실물게시판',
    page: 0,
    take: 2,
  });

  const navigate = useNavigate();

  return (
    <section>
      <div className="flex items-center">
        <h1 className="text-[2rem] font-bold xs:text-[1.25rem]">분실물 현황</h1>
        <ArrowUpRight
          onClick={() => {
            navigate(`/lost-article?category=state`);
            window.scrollTo(0, 0);
          }}
          className="ml-2 cursor-pointer"
          size={24}
          strokeWidth={1.5}
        />
      </div>
      <Spacing size={18} direction="vertical" />
      {/* xs */}
      {width < 390 ? (
        <div className="flex w-[calc(100dvw-3.125rem)] gap-[1.063rem] overflow-x-scroll pr-[1.063rem] scrollbar-hide">
          {data?.data.postListResDto.map((item) => (
            <PostCardMissing
              key={item.postId}
              size={Size.view}
              title={item.title}
              subtitle={item.content}
              imgUrl={item.thumbNail}
              date={formatYYYYMMDDHHMM(item.date)}
              onClick={() => navigate(`/lost-article/${item.postId}`, { state: { postId: item.postId } })}
            ></PostCardMissing>
          ))}
        </div>
      ) : null}
      {/* sm, md */}
      {width < 1080 && width >= 390 ? (
        <div className="flex w-[calc(100dvw-3.125rem)] gap-[1.063rem] overflow-x-scroll pr-[1.063rem] scrollbar-hide">
          {data?.data.postListResDto.map((item) => (
            <PostCardMissing
              key={item.postId}
              title={item.title}
              subtitle={item.content}
              imgUrl={item.thumbNail}
              date={formatYYYYMMDDHHMM(item.date)}
              onClick={() => navigate(`/lost-article/${item.postId}`, { state: { postId: item.postId } })}
            ></PostCardMissing>
          ))}
        </div>
      ) : null}
      {/* xxl, xl, lg */}
      {width >= 1080 ? (
        <div className="flex w-[calc(100dvw-3.125rem)] gap-[1.063rem] overflow-x-scroll pr-[1.063rem] scrollbar-hide">
          {data?.data.postListResDto.map((item) => (
            <PostCardMissing
              key={item.postId}
              title={item.title}
              subtitle={item.content}
              imgUrl={item.thumbNail}
              date={formatYYYYMMDDHHMM(item.date)}
              onClick={() => navigate(`/lost-article/${item.postId}`, { state: { postId: item.postId } })}
            ></PostCardMissing>
          ))}
        </div>
      ) : null}
    </section>
  );
  function EmptyPost() {
    return (
      <p className="flex h-[24.25rem] w-full items-center justify-center text-gray-600">등록된 게시물이 없습니다.</p>
    );
  }
};

export default LostArticleSection;
