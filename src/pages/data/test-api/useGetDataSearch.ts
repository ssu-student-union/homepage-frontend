import { clientAuth } from '@/apis/client';
import { useQuery } from '@tanstack/react-query';

const getBoardDataSearch = async ({ take }: useGetDataSearchProps) => {
  const response = await clientAuth({
    url: '/board/data/posts/search',
    method: 'GET',
    params: { take },
  });
  return response;
};

export default function useGetDataSearch({ take }: useGetDataSearchProps) {
  return useQuery({
    queryKey: ['boardDataSearch'],
    queryFn: () => getBoardDataSearch({ take }),
  });
}

interface useGetDataSearchProps {
  take: number;
}
