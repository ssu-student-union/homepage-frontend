import { PostListDtoResponse } from '@/types/getPetitionTopLiked';

export interface PostTextPetitionProps {
  data: PostListDtoResponse;
  onClick: (id: number) => void;
}
