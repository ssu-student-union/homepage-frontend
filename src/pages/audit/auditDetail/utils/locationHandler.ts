import { NavigateFunction } from 'react-router-dom';

interface dataType {
  data: {
    postId: number;
    title: string;
    content: string;
    category: string;
    imageUrls: string[];
    thumbnailImage: string;
  };
}

export const handleLocation = ({ data }: dataType, navigate: NavigateFunction) => {
  console.log(data.thumbnailImage);
  navigate(`/homepage-frontend/audit/patch`, { state: { data } });
};
