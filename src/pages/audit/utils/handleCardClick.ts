import { NavigateFunction } from 'react-router-dom';

export const handleCardClick = (id: string, postData: any, navigate: NavigateFunction) => {
  navigate(`/audit/${id}`, { state: { postData } });
};
