import { PostCardMissing } from '@/components/PostCard/PostCardBasicMissing';
import { Spacing } from '@/components/Spacing';
import { useGetBoardPosts } from '@/hooks/api/get/useGetBoardPosts';
import { useResize } from '@/hooks/useResize';
import { GetLostArticlePostsResponse } from '@/types/getBoardPosts';
import { formatYYYYMMDDHHMM } from '@/utils/formatYYYYMMDDHHMM';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

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

  const { t } = useTranslation();

  return (
    <section>
      <div className="flex items-center">
        <h1 className="text-[1.25rem] font-bold sm:text-[2rem]">{t('introduction.분실물 현황')}</h1>
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
      <div className="scrollbar-hide flex w-full gap-[1.5rem] overflow-x-scroll pr-[1.5rem] md:pr-0">
        {data?.data.pageInfo.totalElements ? (
          <>
            {/* xs */}
            {width < 390 && (
              <>
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
              </>
            )}

            {/* sm, md */}
            {width >= 390 && width < 1080 && (
              <>
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
              </>
            )}

            {/* xxl, xl, lg */}
            {width >= 1080 && (
              <>
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
              </>
            )}
          </>
        ) : (
          <p className="flex h-[24.25rem] w-full items-center justify-center text-gray-600">
            등록된 게시물이 없습니다.
          </p>
        )}
      </div>
    </section>
  );
};

export default LostArticleSection;
