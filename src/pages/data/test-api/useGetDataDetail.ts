import { clientAuth } from '@/apis/client';
import { useQuery } from '@tanstack/react-query';

const getBoardDataDetail = async ({ postId }: useGetDataSearchProps) => {
  const response = await clientAuth({
    url: `/board/data/posts/${postId}`,
    method: 'GET',
  });
  return response;
};

export default function useGetDataDetail({ postId }: useGetDataSearchProps) {
  return useQuery({
    queryKey: ['boardDataDetail'],
    queryFn: () => getBoardDataDetail({ postId }),
  });
}

interface useGetDataSearchProps {
  postId: number;
}
