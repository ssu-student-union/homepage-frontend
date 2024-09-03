import { useNavigate } from 'react-router-dom';

export const handleCardClick = (id: string, postId: number, thumbnailImage: string | undefined) => {
  const navigate = useNavigate();

  navigate(`/homepage-frontend/partnership/${id}`, { state: { postId, thumbnailImage } });
};
