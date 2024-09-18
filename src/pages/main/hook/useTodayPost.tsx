import { useEffect, useState } from 'react';
import { useGetBoardPosts } from '@/hooks/useGetBoardPosts';
import { Post } from '@/types/apis/get';
import { useRecoilState } from 'recoil';
import { todayPostCountState } from '@/recoil/atoms/atom';

export function useTodayPost(urlSubCategory: string) {
  const [todayPostCount, setTodayPostCount] = useRecoilState(todayPostCountState('중앙기구'));
  const [page, setPage] = useState<number>(0);
  const [stopFetching, setStopFetching] = useState<boolean>(false);

  const { data, isLoading, isError } = useGetBoardPosts<any>({
    boardCode: '공지사항게시판',
    take: 10,
    page,
    groupCode: '중앙기구',
    memberCode: urlSubCategory || '',
  });

  const posts: Post[] = data?.data?.postListResDto || [];

  const isPostToday = (dateString: string): boolean => {
    const todayKST = new Date().toLocaleDateString('ko-KR', {
      timeZone: 'Asia/Seoul',
    });

    const postDate = new Date(dateString).toLocaleDateString('ko-KR', {
      timeZone: 'Asia/Seoul',
    });

    return postDate === todayKST;
  };

  useEffect(() => {
    if (isLoading || !data) {
      setTodayPostCount(0);
      return;
    }

    const count = posts.filter((post) => isPostToday(post.date)).length;
    setTodayPostCount(count);

    if (posts.length < 10) {
      setStopFetching(true);
    } else {
      setPage((prevPage) => prevPage + 1);
    }
  }, [data, isLoading, posts]);

  return {
    todayPostCount,
    isLoading,
    isError,
    stopFetching,
  };
}
