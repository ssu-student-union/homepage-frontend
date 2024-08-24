import { getPetitionPostsTopLiked } from '@/apis/getPetitionPostsTopLiked';
import { GetPetitionPostsTopLikedProps, PetitionPostsTopLikedResponse } from '@/types/getPetitionTopLiked';
import { useQuery } from '@tanstack/react-query';

export const useGetPetitionTopLiked = ({ page, take }: GetPetitionPostsTopLikedProps) => {
  return useQuery<PetitionPostsTopLikedResponse>({
    queryKey: ['getPetitionTopLiked', page, take],
    queryFn: () => getPetitionPostsTopLiked({ page, take }),
  });
};
