import { Size } from '@/components/PostCard/const/state';
import { PostCardMissing } from '@/components/PostCard/PostCardBasicMissing';
import { Spacing } from '@/components/Spacing';
import { useGetBoardPosts } from '@/hooks/useGetBoardPosts';
import { useResize } from '@/hooks/useResize';
import { GetLostArticlePostsResponse } from '@/types/getBoardPosts';

const LostArticleSection = () => {
  const { width } = useResize();
  const { data } = useGetBoardPosts<GetLostArticlePostsResponse>({
    boardCode: '분실물게시판',
    page: 0,
    take: 2,
  });
  return (
    <section>
      <h1 className="text-[2rem] font-bold xs:text-[1.25rem]">분실물 현황</h1>
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
              date={item.date}
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
              date={item.date}
            ></PostCardMissing>
          ))}
        </div>
      ) : null}
      {/* xxl, xl, lg */}
      {width >= 1080 ? (
        <div className="flex h-fit w-full justify-between">
          {data?.data.postListResDto.map((item) => (
            <PostCardMissing
              key={item.postId}
              title={item.title}
              subtitle={item.content}
              imgUrl={item.thumbNail}
              date={item.date}
            ></PostCardMissing>
          ))}
        </div>
      ) : null}
    </section>
  );
};

export default LostArticleSection;
