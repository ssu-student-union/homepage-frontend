import { useEffect, useState } from 'react';
import { useGetBoardPosts } from '@/hooks/api/get/useGetBoardPosts';
import { Post } from '@/types/apis/get';
import { useRecoilState } from 'recoil';
import { todayPostCountState } from '@/recoil/atoms/atom';
import { GetNoticeBoardPostsResponse } from '@/types/getBoardPosts';

interface UseNoticePostProps {
  boardCode: string;
  groupCode: string;
  memberCode?: string;
  take: number;
  page: number;
}

export const useTodayPost = ({ boardCode, groupCode, memberCode, take, page }: UseNoticePostProps) => {
  const [todayPostCount, setTodayPostCount] = useRecoilState(todayPostCountState('중앙기구'));
  const [_, setPageCount] = useState<number>(0);
  const [stopFetching, setStopFetching] = useState<boolean>(false);

  const { data, isLoading, isError } = useGetBoardPosts<GetNoticeBoardPostsResponse>({
    boardCode,
    take,
    page,
    groupCode,
    memberCode,
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
      setPageCount((prevPage) => prevPage + 1);
    }
  }, [data, isLoading, posts, setTodayPostCount]);

  return {
    data,
    todayPostCount,
    isLoading,
    isError,
    stopFetching,
  };
};
