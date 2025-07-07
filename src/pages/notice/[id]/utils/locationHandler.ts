import { LostArticlePost } from '@/pages/lost-article/schema';
import { ServiceNoticePost } from '@/pages/mypage/service-notice/schema';
import { NoticePost } from '@/pages/notice/schema';
import { NavigateFunction } from 'react-router';

export interface dataType {
  data: {
    postId: number;
    postDetail?: NoticePost;
  };
}

export interface LostArticledataType {
  data: {
    postId: number;
    postDetail?: LostArticlePost;
  };
}


export const handleLocation = ({ data }: dataType, navigate: NavigateFunction) => {
  navigate(`/notice/${data.postId}/patch`, { state: { data } });
};

export const serviceNoticeHandleLocation = ({ data }: dataType, navigate: NavigateFunction) => {
  navigate(`/service-notice/${data.postId}/patch`, { state: { data } });
};

export const lostArticleHandleLocation = ({ data }: LostArticledataType, navigate: NavigateFunction) => {
  navigate(`/lost-article/${data.postId}/patch`, { state: { data } });
};