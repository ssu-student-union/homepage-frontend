import { useState, useEffect } from 'react';
import axios from 'axios';

export function useFetchPost(
  boardCode: string,
  groupCode: string,
  memberCode: string,
  accessToken: string,
  currentPage: number,
  itemsPerPage: number
) {
  const [posts, setPosts] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchPosts = async () => {
      console.log('Fetching posts with params:', {
        boardCode,
        groupCode,
        memberCode,
        accessToken,
        itemsPerPage,
        currentPage,
      });

      try {
        const response = await axios.get('/api/board/감사기구게시판/감사위원회/중앙감사위원회/posts', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            take: itemsPerPage,
            page: currentPage - 1,
          },
        });

        console.log('Received response:', response.data);

        if (response.data.isSuccess) {
          const transformedPosts = response.data.data.postListResDto.map((post: any) => ({
            postId: post.postId,
            title: post.title,
            content: post.content,
            date: post.date,
            thumbNail: post.thumbNail,
            status: post.status === '새로운' ? 'New' : 'Default',
          }));

          setPosts(transformedPosts);
          setTotalPages(Math.ceil(response.data.data.pageInfo.totalElements / itemsPerPage));
        } else {
          console.error('Error fetching posts:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [boardCode, groupCode, memberCode, accessToken, currentPage, itemsPerPage]);

  return { posts, totalPages };
}
