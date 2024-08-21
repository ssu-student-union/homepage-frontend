import { client } from '@/apis/client';
import { useState, useEffect } from 'react';

export function useFetchPost(boardCode: string, accessToken: string, currentPage: number, itemsPerPage: number) {
  const [posts, setPosts] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await client.get(`/board/${boardCode}/posts`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            take: itemsPerPage,
            page: currentPage - 1,
          },
        });

        if (response.data.isSuccess && Array.isArray(response.data.data.postListResDto)) {
          const transformedPosts = response.data.data.postListResDto.map((post: any) => ({
            postId: post.postId,
            title: post.title,
            content: post.content,
            date: post.date,
            thumbNail: post.thumbNail,
            status: post.status === '새로운' ? 'New' : 'Default',
          }));

          setPosts(transformedPosts);
        } else {
          console.error('에러');
          setPosts([]);
        }

        setTotalPages(Math.ceil(response.data.data.pageInfo.totalElements / itemsPerPage));
      } catch (error) {
        console.error('에러: ', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [boardCode, accessToken, currentPage, itemsPerPage]);

  return { posts, totalPages, loading };
}
