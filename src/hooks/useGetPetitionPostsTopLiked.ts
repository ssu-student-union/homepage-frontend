import { getPetitionPostsTopLiked } from '@/apis/getPetitionPostsTopLiked';
import { BoardPostsResponse, GetBoardPostsProps } from '@/types/getPetitionTopLiked';
import { useQuery } from '@tanstack/react-query';

export const useGetPetitionTopLiked = ({ page, take }: GetBoardPostsProps) => {
  return useQuery<BoardPostsResponse>({
    queryKey: ['getPetitionTopLiked', page, take],
    queryFn: () => getPetitionPostsTopLiked({ page, take }),
  });
};
