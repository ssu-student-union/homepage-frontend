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

  // PostCard 컴포넌트화
  const PostCardWrapper = ({
    postId,
    title,
    subtitle,
    imgUrl,
    date,
  }: {
    postId: number;
    title: string;
    subtitle: string;
    imgUrl: string;
    date: string;
  }) => (
    <PostCardMissing
      key={postId}
      title={title}
      subtitle={subtitle}
      imgUrl={imgUrl ? imgUrl : `image/default/thumbnail/default_thumbnail.png`}
      date={formatYYYYMMDDHHMM(date)}
      onClick={() => navigate(`/lost-article/${postId}`, { state: { postId } })}
    />
  );

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
      {width < 390 && (
        <div className="flex w-[calc(100dvw-3.125rem)] gap-[1.063rem] overflow-x-scroll pr-[1.063rem] scrollbar-hide">
          {data?.data.postListResDto.map((item) => (
            <PostCardWrapper
              key={item.postId}
              postId={item.postId}
              title={item.title}
              subtitle={item.content}
              imgUrl={item.thumbNail}
              date={item.date}
            />
          ))}
        </div>
      )}

      {/* sm, md */}
      {width >= 390 && width < 1080 && (
        <div className="flex w-[calc(100dvw-3.125rem)] gap-[1.063rem] overflow-x-scroll pr-[1.063rem] scrollbar-hide">
          {data?.data.postListResDto.map((item) => (
            <PostCardWrapper
              key={item.postId}
              postId={item.postId}
              title={item.title}
              subtitle={item.content}
              imgUrl={item.thumbNail}
              date={item.date}
            />
          ))}
        </div>
      )}

      {/* xxl, xl, lg */}
      {width >= 1080 && (
        <div className="flex w-[calc(100dvw-3.125rem)] gap-[1.063rem] overflow-x-scroll pr-[1.063rem] scrollbar-hide">
          {data?.data.postListResDto.map((item) => (
            <PostCardWrapper
              key={item.postId}
              postId={item.postId}
              title={item.title}
              subtitle={item.content}
              imgUrl={item.thumbNail}
              date={item.date}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default LostArticleSection;
