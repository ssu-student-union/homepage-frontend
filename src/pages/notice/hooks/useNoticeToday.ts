import { useEffect, useState } from 'react';
import { Post } from '@/types/apis/get';
import { useGetBoardPostSearch } from '@/hooks/useGetBoardPostSearch';

export function useTodayPosts(boardCode: string, category: string, subCategory: string) {
  const [todayPostCount, setTodayPostCount] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [stopFetching, setStopFetching] = useState<boolean>(false);

  const { data, isLoading, isError } = useGetBoardPostSearch<any>({
    boardCode,
    take: 10,
    page,
    groupCode: category === '중앙' ? '중앙기구' : '단과대학생회',
    memberCode: subCategory === '전체' ? '' : subCategory,
  });

  const posts: Post[] = data?.data?.postListResDto || [];

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
    if (posts.length > 0) {
      let count = 0;

      // 긴급 공지 처리
      for (const post of posts) {
        if (post.status === '긴급공지' && isPostToday(post.date)) {
          count++;
        } else if (post.status === '긴급공지' && !isPostToday(post.date)) {
          break;
        }
      }

      // 일반 공지 처리
      for (const post of posts) {
        if (post.status !== '긴급공지' && isPostToday(post.date)) {
          count++;
        }
      }

      setTodayPostCount(count);

      if (posts.length < 10) {
        setStopFetching(true);
      } else {
        setPage((prevPage) => prevPage + 1);
      }
    } else {
      setStopFetching(true);
    }
  }, [posts]);

  return {
    todayPostCount,
    isLoading,
    isError,
    stopFetching,
  };
}
