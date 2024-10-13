import { useEffect, useState } from 'react';
import { useGetBoardPosts } from '@/hooks/useGetBoardPosts';
import { Post } from '@/types/apis/get';
import { useRecoilState } from 'recoil';
import { todayPostCountState } from '@/recoil/atoms/atom';
import { useMemo } from 'react';
import { NoticeResponse } from '../types';

export function useTodayPosts(boardCode: string, category: string, subCategory: string) {
  const [todayPostCount, setTodayPostCount] = useRecoilState(todayPostCountState(category));
  const [page, setPage] = useState<number>(0);
  const [stopFetching, setStopFetching] = useState<boolean>(false);
  const { data, isLoading, isError } = useGetBoardPosts<NoticeResponse>({
    boardCode,
    take: 10,
    page,
    groupCode: category === '중앙' ? '중앙기구' : '단과대학생회',
    memberCode: subCategory === '전체' ? '' : subCategory,
  });

  const posts: Post[] = useMemo(() => data?.data?.postListResDto || [], [data]);

  const isPostToday = (dateString: string): boolean => {
    const today = new Date();
    const todayKST = new Intl.DateTimeFormat('ko-KR', {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(today);

    const [year, month, day] = todayKST
      .split('. ')
      .map((value) => value.trim())
      .map(Number);

    const [datePart] = dateString.split(' ');
    const [postYear, postMonth, postDay] = datePart.split('/').map(Number);

    return year === postYear && month === postMonth && day === postDay;
  };

  useEffect(() => {
    setTodayPostCount(0);

    if (posts.length > 0) {
      let count = 0;
      let stopLoading = false;

      for (const post of posts) {
        if (isPostToday(post.date)) {
          count++;
        } else {
          stopLoading = true;
          break;
        }
      }

      setTodayPostCount(count);

      if (stopLoading || posts.length < 10) {
        setStopFetching(true);
      } else {
        setPage((prevPage) => prevPage + 1);
      }
    } else {
      setStopFetching(true);
    }
  }, [posts, category, subCategory, setTodayPostCount]);

  return {
    todayPostCount,
    isLoading,
    isError,
    stopFetching,
  };
}
