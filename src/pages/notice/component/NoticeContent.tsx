import { useNavigate } from 'react-router-dom';
import { PostCardBasic } from '@/components/PostCard/PostCardBasicMissing';
import { formatYYYYMMDD } from '@/utils/formatYYYYMMDD';
import { Size } from '@/components/PostCard/const/state';
import { useEffect, useState } from 'react';
import { useResponseBoard } from '@/hooks/useResponseBoard';
import { handleCardClick } from '../utils/cardHandler';
import NoticeContentLoading from './NoticeContentLoading';

interface NoticeContentProps {
  initPosts?: Array<{
    postId: number;
    title: string;
    content: string;
    category: string;
    date: string;
    thumbNail: string | null;
    status: string | null;
  }>;
  className?: string;
  isLoading: boolean;
}

export function NoticeContent({ initPosts, isLoading }: NoticeContentProps) {
  const navigate = useNavigate();
  const { size } = useResponseBoard();
  const screenWidth: number = window.innerWidth;
  const [posts, setPosts] = useState(initPosts);

  useEffect(() => {
    setPosts(initPosts);
  }, [initPosts]);

  if (isLoading) {
    return <NoticeContentLoading screenWidth={screenWidth} />;
  } else {
    if (!posts || posts.length === 0) {
      return (
        <div className="flex h-[32rem] w-full items-center justify-center text-gray-600">등록된 게시물이 없습니다</div>
      );
    }
    if (screenWidth >= 1920) {
      return (
        <div className="flex flex-col justify-between">
          <div className="flex flex-row justify-between pb-[30px]">
            {posts.slice(0, 3).map((post) => (
              <RenderCard key={post.postId} post={post} size={size} />
            ))}
          </div>
          <div className="flex flex-row justify-between pb-[30px]">
            {posts.slice(3, 6).map((post) => (
              <RenderCard key={post.postId} post={post} size={size} />
            ))}
          </div>
          <div className="flex flex-row justify-between">
            {posts.slice(6, 9).map((post) => (
              <RenderCard key={post.postId} post={post} size={size} />
            ))}
          </div>
        </div>
      );
    } else if (screenWidth >= 1440 && screenWidth < 1920) {
      return (
        <div className="flex flex-col justify-between">
          <div className="flex flex-row justify-between pb-[30px]">
            {posts.slice(0, 2).map((post) => (
              <RenderCard key={post.postId} post={post} size={size} />
            ))}
          </div>
          <div className="flex flex-row justify-between pb-[30px]">
            {posts.slice(2, 4).map((post) => (
              <RenderCard key={post.postId} post={post} size={size} />
            ))}
          </div>
          <div className="flex flex-row justify-between">
            {posts.slice(4, 6).map((post) => (
              <RenderCard key={post.postId} post={post} size={size} />
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col justify-between">
          {posts.map((post) => (
            <RenderCard key={post.postId} post={post} size={size} />
          ))}
        </div>
      );
    }
  }

  function RenderCard({
    post,
    size,
  }: {
    post: {
      postId: number;
      title: string;
      content: string;
      date: string;
      thumbNail: string | null;
      status: string | null;
      category: string;
    };
    size: Size;
  }) {
    const formattedDate = post.date ? formatYYYYMMDD(post.date) : '';
    const status = post.status === '긴급공지' ? 'Emergency' : 'Default';
    const thumbnail = post.thumbNail || undefined;

    return (
      <div key={post.postId} className="xs-pb[20px] sm:pb-[20px] md:pb-[20px] lg:pb-[20px]">
        <PostCardBasic
          size={size}
          imgUrl={thumbnail}
          title={post.title}
          subtitle={post.content}
          date={formattedDate}
          badgeType={status}
          profileName={'중앙'}
          className="cursor-pointer"
          onClick={() => handleCardClick(post.postId.toString(), post.postId, navigate)}
        />
      </div>
    );
  }
}
