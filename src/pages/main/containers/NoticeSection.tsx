import { BoardSelector } from '@/components/Board/BoardSelector';
import { Spacing } from '@/components/Spacing';
import { useBoardSelect } from '@/hooks/useBoardSelect';
import { Button } from '@/components/ui/button';
import { PostCardNotice } from '@/components/PostCard/PostCardNotice';
import { useResize } from '@/hooks/useResize';
import { useGetBoardPosts } from '@/hooks/useGetBoardPosts';
import { GetNoticeBoardPostsResponse } from '@/types/getBoardPosts';
import { useMemo } from 'react';
import { MainNotices, MainNoticesType } from '@/types';
import { useNavigate } from 'react-router-dom';

const NoticeSection = () => {
  const { selectedSubcategories, onSubcategorySelect } = useBoardSelect<MainNoticesType>(MainNotices[0]);
  const { width } = useResize();
  const { data, isLoading } = useGetBoardPosts<GetNoticeBoardPostsResponse>({
    boardCode: '공지사항게시판',
    page: 0,
    take: 4,
    groupCode: '중앙기구',
    memberCode: selectedSubcategories === '전체' ? undefined : (selectedSubcategories as string),
  });
  const noticeCount = useMemo(() => {
    if (isLoading) {
      return 0;
    }
    return data?.data.pageInfo.totalElements || 0;
  }, [data?.data.pageInfo.totalElements, isLoading]);

  const navigate = useNavigate();

  return (
    <section className="w-full whitespace-nowrap">
      <h1 className="text-[2rem] font-bold xs:text-[1.25rem]">공지사항</h1>
      <Spacing size={11} direction="vertical" />
      <p className="font-bold">
        <span>오늘 </span>
        <span className="text-primary">{`${noticeCount}개`}</span>
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
            {/* xs */}
            {width < 390 ? (
              <div className="flex w-[calc(100dvw-3.125rem)] gap-[1.063rem] overflow-x-scroll pr-[1.063rem] scrollbar-hide">
                {data?.data.postListResDto.map((notice) => (
                  <PostCardNotice
                    badgeType={notice.status}
                    key={notice.postId}
                    imgUrl={notice.thumbNail}
                    title={notice.title}
                    profileName={notice.author}
                  />
                ))}
              </div>
            ) : null}
            {/* sm, md */}
            {width < 1080 && width >= 390 ? (
              <div className="flex w-[calc(100dvw-3.125rem)] gap-[1.063rem] overflow-x-scroll pr-[1.063rem] scrollbar-hide">
                {data?.data.postListResDto.map((notice) => (
                  <PostCardNotice
                    badgeType={notice.status}
                    key={notice.postId}
                    imgUrl={notice.thumbNail}
                    title={notice.title}
                    profileName={notice.author}
                  />
                ))}
              </div>
            ) : null}
            {/* lg */}
            {width < 1440 && width >= 1080 ? (
              <div className="flex h-fit w-full justify-between gap-[26px]">
                {data?.data.postListResDto.map((notice) => (
                  <PostCardNotice
                    badgeType={notice.status}
                    key={notice.postId}
                    imgUrl={notice.thumbNail}
                    title={notice.title}
                    profileName={notice.author}
                  />
                ))}
              </div>
            ) : null}
            {/* xl */}
            {width >= 1440 && width < 1920 ? (
              <div className="flex h-fit w-full justify-between">
                {data?.data.postListResDto.map((notice) => (
                  <PostCardNotice
                    badgeType={notice.status}
                    key={notice.postId}
                    imgUrl={notice.thumbNail}
                    title={notice.title}
                    profileName={notice.author}
                  />
                ))}
              </div>
            ) : null}
            {/* xxl */}
            {width >= 1920 ? (
              <div className="flex h-fit w-full justify-between">
                {data?.data.postListResDto.map((notice) => (
                  <PostCardNotice
                    badgeType={notice.status}
                    key={notice.postId}
                    imgUrl={notice.thumbNail}
                    title={notice.title}
                    profileName={notice.author}
                    date={notice.date}
                    subtitle={notice.content}
                  />
                ))}
              </div>
            ) : null}
          </>
        ) : (
          <p className="flex h-[24.25rem] w-full items-center justify-center text-gray-600">
            등록된 게시물이 없습니다.
          </p> // 게시물이 없을 때 이 문구를 표시
        )}
        <Spacing size={68} direction="vertical" />
        {width >= 720 ? (
          <Button
            onClick={() => {
              navigate(`/notice`);
            }}
            className="h-fit w-fit rounded-full px-[1rem] py-[0.5rem] text-[1rem]"
          >
            더 알아보기
          </Button>
        ) : null}
      </div>
    </section>
  );
};

export default NoticeSection;
