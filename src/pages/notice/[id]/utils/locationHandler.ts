import { NoticePost } from '@/pages/notice/schema';
import { NavigateFunction } from 'react-router';

export interface dataType {
  data: {
    postId: number;
    postDetail?: NoticePost;
  };
}

export const handleLocation = ({ data }: dataType, navigate: NavigateFunction) => {
  navigate(`/notice/${data.postId}/patch`, { state: { data } });
};

export const serviceNoticeHandleLocation = ({ data }: dataType, navigate: NavigateFunction) => {
  navigate(`/service-notice/${data.postId}/patch`, { state: { data } });
};
