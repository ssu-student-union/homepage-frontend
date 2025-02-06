import { NavigateFunction } from 'react-router-dom';

export const handleCardClick = (navigate: NavigateFunction, id: string, postId: number, thumbnailImage?: string) => {
  navigate(`/partnership/${id}`, { state: { postId, thumbnailImage } });
};
