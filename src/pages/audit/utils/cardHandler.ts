import { NavigateFunction } from 'react-router-dom';

export const handleCardClick = (
  id: string,
  postId: number,
  category: string,
  thumbnailImage: string | undefined,
  navigate: NavigateFunction
) => {
  navigate(`/homepage-frontend/audit/${id}`, { state: { postId, category, thumbnailImage } });
};
