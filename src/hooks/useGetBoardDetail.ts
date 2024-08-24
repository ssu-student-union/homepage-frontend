import { getBoardDetail } from '@/apis/getBoardDetail';
import { useQuery } from '@tanstack/react-query';

interface useBoardDetailProps {
  boardCode: string;
  postId: number;
  userId?: number;
}

export function useGetBoardDetail({ boardCode, postId, userId = 0 }: useBoardDetailProps) {
  const queryKey = ['get-board-boardCode-posts-postId', boardCode, postId];

  const { data } = useQuery({
    queryKey,
    queryFn: () => getBoardDetail({ boardCode, postId, userId }),
    staleTime: 300000,
  });

  const postDetail = data?.data?.postDetailResDto || null;
  console.log(postDetail);
  return {
    postDetail,
  };
}
