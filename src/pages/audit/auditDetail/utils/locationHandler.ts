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
  navigate(`/audit/patch`, { state: { data } });
};
