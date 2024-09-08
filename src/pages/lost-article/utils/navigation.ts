import { NavigateFunction } from 'react-router-dom';

export const handleCardClick = (id: string, postId: number, navigate: NavigateFunction) => {
  navigate(`/lost-article/${id}`, { state: { postId } });
};
