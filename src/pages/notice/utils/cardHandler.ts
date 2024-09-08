import { NavigateFunction } from 'react-router-dom';

export const handleCardClick = (
  id: string,
  postId: number,
  category: string,
  thumbnailImage: string | undefined,
  navigate: NavigateFunction
) => {
  navigate(`/homepage-frontend/notice/${id}`, { state: { postId, category, thumbnailImage } });
};
