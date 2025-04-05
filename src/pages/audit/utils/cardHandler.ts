import { NavigateFunction } from 'react-router';

export const handleCardClick = (id: string, postId: number, navigate: NavigateFunction) => {
  navigate(`/audit/${id}`, { state: { postId } });
};
