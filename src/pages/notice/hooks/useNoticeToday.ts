import { useEffect, useMemo, useState } from 'react';
import { useGetBoardPostSearch } from '@/hooks/api/get/useGetBoardPostSearch';

export function useTodayPosts(boardCode: string, category: string, subCategory: string) {
  const [todayPostCount, setTodayPostCount] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [stopFetching, setStopFetching] = useState<boolean>(false);

  const { data, isLoading, isError } = useGetBoardPostSearch<GetBoardPostSearchResp>({
    boardCode,
    take: 10,
    page,
    groupCode: category === '중앙' ? '중앙기구' : '단과대학생회',
    memberCode: subCategory === '전체' ? '' : subCategory,
  });

  // ✅ useMemo를 사용하여 posts 값 메모이제이션 (불필요한 재계산 방지)
  const posts: NoticePost[] = useMemo(() => data?.data?.postListResDto || [], [data]);

  console.log(data);

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
    if (posts.length >= 0) {
      let count = 0;
      let stopLoading = false;

      // 긴급 공지 처리
      for (const post of posts) {
        if (post.status === '긴급공지' && isPostToday(post.date)) {
          count++;
        } else if (post.status === '긴급공지' && !isPostToday(post.date)) {
          stopLoading = true;
          break;
        }
      }

      // 일반 공지 처리
      if (!stopLoading) {
        for (const post of posts) {
          if (post.status !== '긴급공지' && isPostToday(post.date)) {
            count++;
          } else if (post.status !== '긴급공지' && !isPostToday(post.date)) {
            stopLoading = true;
            break;
          }
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
  }, [posts, category, subCategory]); // ✅ posts가 useMemo로 관리되어 불필요한 useEffect 실행 방지

  return {
    todayPostCount,
    isLoading,
    isError,
    stopFetching,
  };
}

export interface AllowedAuthorities {
  allowedAuthorities: string[]; // 예: ["WRITE", "READ"]
  deniedAuthorities: string[]; // 예: []
}

export interface PageInfo {
  pageNum: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

export interface NoticePost {
  postId: number;
  title: string;
  content: string;
  date: string; // "YYYY/MM/DD HH:mm:ss" 형식
  category: string | null;
  author: string;
  status: string;
  thumbNail: string | null;
}

export interface GetBoardPostSearchResp {
  code: string; // 예: "200"
  data: {
    allowedAuthorities: string[]; // ["WRITE", "READ"]
    deniedAuthorities: string[]; // []
    pageInfo: PageInfo;
    postListResDto: NoticePost[];
  };
  isSuccess: boolean;
  message: string; // 예: "성공 입니다."
}
