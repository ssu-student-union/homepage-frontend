import { NavigateFunction } from 'react-router';

export const handleCardClick = (id: string, postId: number, navigate: NavigateFunction) => {
  navigate(`/notice/${id}`, { state: { postId } });
};
