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
        <h1 className="text-lg md:text-[2rem] font-bold">{t('introduction.공지사항')}</h1>
      </div>

      <Spacing size={11} direction="vertical" />
      <p className="text-sm md:text-base font-bold text-gray-500">
        <span>오늘 </span>
        <span className="text-primary">{`${todayPostCount}개`}</span>
        <span>{`의 공지가 올라왔어요!`}</span>
      </p>
      <Spacing size={21} direction="vertical" />
      <BoardSelector
        subcategories={MainNotices}
        selectedSubcategory={selectedSubcategories}
        onSubcategorySelect={onSubcategorySelect}
        className="text-xs md:text-lg"
      />
      <Spacing size={24} direction="vertical" />
      <div className="flex flex-col md:items-center">
        {data?.data.pageInfo.totalElements ? (
          <>
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
              <div className="flex w-[calc(100dvw-3.125rem)] justify-center gap-[18px] pb-[16px] pt-[0.625rem] xl:px-[11.0rem]">
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
              <div className="flex w-[calc(100dvw-3.125rem)] justify-center gap-[26px] pb-[16px] pt-[0.625rem] ">
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
            <Spacing size={width >= 720 ? 68 : 30} direction="vertical" />

            <Button
              onClick={() => {
                navigate(`/notice`);
              }}
              className="h-[30px] w-[87px] mx-auto rounded-full px-[1rem] py-[0.5rem] text-[12px] md:h-fit md:w-fit md:mx-0 md:text-[1rem]"
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
