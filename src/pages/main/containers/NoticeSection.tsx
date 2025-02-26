import { BoardSelector } from '@/components/Board/BoardSelector';
import { Spacing } from '@/components/Spacing';
import { useBoardSelect } from '@/hooks/useBoardSelect';
import { Button } from '@/components/ui/button';
import { PostCardNotice } from '@/components/PostCard/PostCardNotice';
import { useResize } from '@/hooks/useResize';
import { MainNotices, MainNoticesType } from '@/types/boardSelector';
import { useNavigate } from 'react-router-dom';
import { formatYYYYMMDD } from '@/utils/formatYYYYMMDD';
import { useTodayPost } from '../hook/useTodayPost';
import { useTranslation } from 'react-i18next';

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

  const { t } = useTranslation();

  return (
    <section className="w-full whitespace-nowrap">
      <div className="flex items-center">
        <h1 className="text-[2rem] font-bold xs:text-lg sm:text-lg">{t('introduction.공지사항')}</h1>
      </div>

      <Spacing size={11} direction="vertical" />
      <p className="font-bold text-gray-500 xs:text-sm sm:text-sm">
        <span>오늘 </span>
        <span className="text-primary">{`${todayPostCount}개`}</span>
        <span>{`의 공지가 올라왔어요!`}</span>
      </p>
      <Spacing size={21} direction="vertical" />
      <BoardSelector
        subcategories={MainNotices}
        selectedSubcategory={selectedSubcategories}
        onSubcategorySelect={onSubcategorySelect}
        className="text-lg xs:text-xs sm:text-xs"
      />
      <Spacing size={24} direction="vertical" />
      <div className="flex flex-col md:items-center lg:items-center xl:items-center xxl:items-center">
        {data?.data.pageInfo.totalElements ? (
          <>
<<<<<<< HEAD
            {/* xs, sm, md */}
            {width < 1080 && (
              <div className="scrollbar-hide flex w-[calc(100dvw-3.125rem)] items-start justify-start gap-[1.063rem] overflow-x-scroll pl-0 pr-[1.063rem] pt-[0.625rem] lg:px-[11.0rem] xl:px-[11.0rem] xxl:px-[11.0rem]">
=======
            {/* xs, sm */}
            {width >= 360 && width < 720 && (
              <div className="mx-auto flex w-[90vw] flex-col justify-center gap-[16px] pb-[16px] pt-[0.625rem]">
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
                      subtitle={notice.content}
                    />
                  );
                })}
              </div>
            )}

            {/*  md */}
            {width >= 720 && width < 1080 && (
              <div className="flex w-[calc(100dvw-3.125rem)] justify-center gap-[16px] pb-[16px] pt-[0.625rem]">
>>>>>>> develop
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
<<<<<<< HEAD
              <div className="scrollbar-hide flex w-[calc(100dvw-3.125rem)] items-start justify-start gap-[1.063rem] overflow-x-scroll pl-0 pr-[1.063rem] pt-[0.625rem] lg:px-[11.0rem] xl:px-[11.0rem] xxl:px-[11.0rem]">
=======
              <div className="flex w-[calc(100dvw-3.125rem)] justify-center gap-[18px] pb-[16px] pt-[0.625rem] xl:px-[11.0rem] xxl:px-[11.0rem]">
>>>>>>> develop
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
<<<<<<< HEAD
              <div className="scrollbar-hide flex w-[calc(100dvw-3.125rem)] items-start justify-start gap-[1.063rem] overflow-x-scroll pl-0 pr-[1.063rem] pt-[0.625rem] lg:px-[11.0rem] xl:px-[11.0rem] xxl:px-[11.0rem]">
                {data?.data.postListResDto.slice(0, 4).map((notice) => {
=======
              <div className="flex w-[calc(100dvw-3.125rem)] justify-center gap-[26px] pb-[16px] pt-[0.625rem] ">
                {data?.data.postListResDto.slice(0, 3).map((notice) => {
>>>>>>> develop
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
            <Spacing size={width >= 720 ? 68 : 30} direction="vertical" />

            <Button
              onClick={() => {
                navigate(`/notice`);
              }}
              className="h-fit w-fit rounded-full px-[1rem] py-[0.5rem] text-[1rem]
              xs:mx-auto xs:h-[30px] xs:w-[87px] xs:text-[12px]
              sm:mx-auto sm:h-[30px] sm:w-[87px] sm:text-[12px]"
            >
              {t('main.더 알아보기')}
            </Button>
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
