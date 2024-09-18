import { BoardSelector } from '@/components/Board/BoardSelector';
import { Spacing } from '@/components/Spacing';
import { useBoardSelect } from '@/hooks/useBoardSelect';
import { Button } from '@/components/ui/button';
import { PostCardNotice } from '@/components/PostCard/PostCardNotice';
import { useResize } from '@/hooks/useResize';
import { MainNotices, MainNoticesType } from '@/types';
import { useNavigate } from 'react-router-dom';
import { formatYYYYMMDD } from '@/utils/formatYYYYMMDD';
import { useEffect, useState } from 'react';
import { useNoticePost } from '../hook/useNoticePost';
import { useTodayPost } from '../hook/useTodayPost';

const NoticeSection = () => {
  const { selectedSubcategories, onSubcategorySelect } = useBoardSelect<MainNoticesType>(MainNotices[0]);
  const { width } = useResize();
  const navigate = useNavigate();
  const [take, setTake] = useState(4);

  useEffect(() => {
    if (width >= 1440) {
      setTake(3);
    } else if (width >= 1080) {
      setTake(2);
    } else if (width >= 720 || width >= 390) {
      setTake(4);
    }
  }, [width]);

  const { data, noticeCount } = useNoticePost({
    boardCode: '공지사항게시판',
    groupCode: '중앙기구',
    memberCode: selectedSubcategories === '전체' ? undefined : selectedSubcategories,
    take,
  });

  const todayPostCount = useTodayPost(selectedSubcategories === '전체' ? '' : selectedSubcategories);

  return (
    <section className="w-full whitespace-nowrap">
      <h1 className="text-[2rem] font-bold xs:text-[1.25rem]">공지사항</h1>
      <Spacing size={11} direction="vertical" />
      <p className="font-bold">
        <span>오늘 </span>
        <span className="text-primary">{`${todayPostCount.todayPostCount}개`}</span>
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
        {noticeCount ? (
          <div className="flex w-[calc(100dvw-3.125rem)] items-start justify-start gap-[1.063rem] overflow-x-scroll pr-[1.063rem] scrollbar-hide xs:pl-[3.125rem] sm:pl-[3.125rem] md:pl-[3.125rem] lg:px-[12.5rem] xl:px-[12.5rem] xxl:px-[12.5rem]">
            {data?.data.postListResDto.map((notice) => (
              <PostCardNotice
                key={notice.postId}
                onClick={() => navigate(`/notice/${notice.postId}`, { state: { postId: notice.postId } })}
                badgeType={notice.status}
                imgUrl={notice.thumbNail}
                title={notice.title}
                date={formatYYYYMMDD(notice.date)}
                profileName={notice.author}
              />
            ))}
          </div>
        ) : (
          <p className="flex h-[24.25rem] w-full items-center justify-center text-gray-600">
            등록된 게시물이 없습니다.
          </p>
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
      </div>
    </section>
  );
};

export default NoticeSection;
