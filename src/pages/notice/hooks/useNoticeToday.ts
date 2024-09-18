import { useEffect, useState } from 'react';
import { useGetBoardPosts } from '@/hooks/useGetBoardPosts';
import { useNoticeCategory } from './useNoticeCategory';
import { categoryToCode, collegeSubCategoryToCode, subCategoryToCode } from '../const/data';
import { Post } from '@/types/apis/get';
import { useRecoilState } from 'recoil';
import { todayPostCountState } from '@/recoil/atoms/atom';

export function useTodayPosts(boardCode: string) {
  const { urlCategory, urlSubCategory } = useNoticeCategory();
  const selectedCategory = categoryToCode[urlCategory];
  var selectedSubCategory;
  if (selectedCategory === '중앙기구') {
    selectedSubCategory = subCategoryToCode[urlSubCategory];
  } else {
    selectedSubCategory = collegeSubCategoryToCode[urlSubCategory];
  }

  const [todayPostCount, setTodayPostCount] = useRecoilState(todayPostCountState(selectedCategory));
  const [page, setPage] = useState<number>(0);
  const [stopFetching, setStopFetching] = useState<boolean>(false);

  const { data, isLoading, isError } = useGetBoardPosts<any>({
    boardCode,
    take: 10,
    page,
    groupCode: selectedCategory,
    memberCode: selectedSubCategory,
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
  }, [posts]);

  return {
    todayPostCount,
    isLoading,
    isError,
    stopFetching,
  };
}
