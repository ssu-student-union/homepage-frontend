import { BoardSelector } from '@/components/Board/BoardSelector';
import { Spacing } from '@/components/Spacing';
import { useBoardSelect } from '@/hooks/useBoardSelect';
import { Button } from '@/components/ui/button';
import { PostCardNotice } from '@/components/PostCard/PostCardNotice';
import { useResize } from '@/hooks/useResize';
import { MainNotices, MainNoticesType } from '@/types/boardSelector';
import { useNavigate } from 'react-router-dom';
import { formatYYYYMMDD } from '@/utils/formatYYYYMMDD';
import { ArrowUpRight } from 'lucide-react';
import { useTodayPost } from '../hook/useTodayPost';

const NoticeSection = () => {
  const { selectedSubcategories, onSubcategorySelect } = useBoardSelect<MainNoticesType>(MainNotices[0]);
  const { width } = useResize();
  const navigate = useNavigate();

  const { data, todayPostCount } = useTodayPost({
    boardCode: '공지사항게시판',
    take: 10,
    page: 0,
    groupCode: '중앙기구',
    memberCode: selectedSubcategories === '전체' ? '' : selectedSubcategories,
  });

  return (
    <section className="w-full whitespace-nowrap">
      <div className="flex items-center">
        <h1 className="text-[2rem] font-bold xs:text-[1.25rem]">공지사항</h1>
        <ArrowUpRight
          onClick={() => {
            navigate(`/notice`);
            window.scrollTo(0, 0);
          }}
          className="ml-2 cursor-pointer"
          size={24}
          strokeWidth={1.5}
        />
      </div>

      <Spacing size={11} direction="vertical" />
      <p className="font-bold">
        <span>오늘 </span>
        <span className="text-primary">{`${todayPostCount}개`}</span>
        <span>{`의 공지가 올라왔어요!`}</span>
      </p>
      <Spacing size={21} direction="vertical" />
      <BoardSelector
        subcategories={MainNotices}
        selectedSubcategory={selectedSubcategories}
        onSubcategorySelect={onSubcategorySelect}
      />
      <Spacing size={width > 390 ? 32 : 22} direction="vertical" />
      <div className="flex flex-col md:items-center lg:items-center xl:items-center xxl:items-center">
        {data?.data.pageInfo.totalElements ? (
          <>
            {/* xs, sm, md */}
            {width < 1080 && (
              <div className="scrollbar-hide flex w-[calc(100dvw-3.125rem)] items-start justify-start gap-[1.063rem] overflow-x-scroll pb-[16px] pl-0 pr-[1.063rem] pt-[0.625rem] lg:px-[11.0rem] xl:px-[11.0rem] xxl:px-[11.0rem]">
                {data?.data.postListResDto.slice(0, 2).map((notice) => {
                  let thumbnail = notice.thumbNail || undefined;
                  if (notice.status === '긴급공지' && thumbnail === undefined) {
                    thumbnail = `image/default/thumbnail/thumbnail_299px.png`;
                  }
                  return (
                    <PostCardNotice
                      key={notice.postId}
                      onClick={() => navigate(`/notice/${notice.postId}`, { state: { postId: notice.postId } })}
                      badgeType={notice.status}
                      imgUrl={thumbnail}
                      title={notice.title}
                      date={formatYYYYMMDD(notice.date)}
                      profileName={notice.author}
                    />
                  );
                })}
              </div>
            )}

            {/* lg */}
            {width >= 1080 && width < 1440 && (
              <div className="scrollbar-hide flex w-[calc(100dvw-3.125rem)] items-start justify-start gap-[1.063rem] overflow-x-scroll pb-[16px] pl-0 pr-[1.063rem] pt-[0.625rem] lg:px-[11.0rem] xl:px-[11.0rem] xxl:px-[11.0rem]">
                {data?.data.postListResDto.slice(0, 3).map((notice) => {
                  let thumbnail = notice.thumbNail || undefined;
                  if (notice.status === '긴급공지' && thumbnail === undefined) {
                    thumbnail = `image/default/thumbnail/thumbnail_299px.png`;
                  }
                  return (
                    <PostCardNotice
                      key={notice.postId}
                      onClick={() => navigate(`/notice/${notice.postId}`, { state: { postId: notice.postId } })}
                      badgeType={notice.status}
                      imgUrl={thumbnail}
                      title={notice.title}
                      date={formatYYYYMMDD(notice.date)}
                      profileName={notice.author}
                    />
                  );
                })}
              </div>
            )}

            {/* xl, xxl */}
            {width >= 1440 && (
              <div className="scrollbar-hide flex w-[calc(100dvw-3.125rem)] items-start justify-start gap-[1.063rem] overflow-x-scroll pb-[16px] pl-0 pr-[1.063rem] pt-[0.625rem] lg:px-[11.0rem] xl:px-[11.0rem] xxl:px-[11.0rem]">
                {data?.data.postListResDto.slice(0, 4).map((notice) => {
                  let thumbnail = notice.thumbNail || undefined;
                  if (notice.status === '긴급공지' && thumbnail === undefined) {
                    thumbnail = `image/default/thumbnail/thumbnail_299px.png`;
                  }
                  return (
                    <PostCardNotice
                      key={notice.postId}
                      onClick={() => navigate(`/notice/${notice.postId}`, { state: { postId: notice.postId } })}
                      badgeType={notice.status}
                      imgUrl={thumbnail}
                      title={notice.title}
                      date={formatYYYYMMDD(notice.date)}
                      profileName={notice.author}
                    />
                  );
                })}
              </div>
            )}
            <Spacing size={68} direction="vertical" />
            {width >= 720 && (
              <Button
                onClick={() => {
                  navigate(`/notice`);
                }}
                className="h-fit w-fit rounded-full px-[1rem] py-[0.5rem] text-[1rem]"
              >
                더 알아보기
              </Button>
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

export default NoticeSection;
