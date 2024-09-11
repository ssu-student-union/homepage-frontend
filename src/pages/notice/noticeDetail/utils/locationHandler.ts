import { NavigateFunction } from 'react-router-dom';

interface dataType {
  data: {
    postId: number;
  };
}

export const handleLocation = ({ data }: dataType, navigate: NavigateFunction) => {
  navigate(`/notice/${data.postId}/patch`, { state: { data } });
};
