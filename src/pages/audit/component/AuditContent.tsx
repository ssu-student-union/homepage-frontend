import { useNavigate } from 'react-router-dom';
import { PostCardBasic } from '@/components/PostCard/PostCardBasicMissing';
import { formatYYYYMMDD } from '@/utils/formatYYYYMMDD';
import { Size } from '@/components/PostCard/const/state';
import { useEffect, useState } from 'react';
import { useResponseBoard } from '@/hooks/useResponseBoard';
import { handleCardClick } from '../utils/cardHandler';

interface AuditContentProps {
  initPosts?: Array<{
    postId: number;
    title: string;
    content: string;
    date: string;
    thumbNail: string | null;
    status: string | null;
  }>;
  className?: string;
}

export function AuditContent({ initPosts }: AuditContentProps) {
  const navigate = useNavigate();
  const { size } = useResponseBoard();
  const screenWidth = window.innerWidth;
  const [posts, setPosts] = useState(initPosts);

  useEffect(() => {
    setPosts(initPosts);
  }, [initPosts]);

  if (!posts || posts.length === 0) {
    return <div>게시물이 없습니다.</div>;
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
    };
    size: Size;
  }) {
    const formattedDate = post.date ? formatYYYYMMDD(post.date) : '';
    const status = post.status === '새로운' ? 'New' : 'Default';

    return (
      <div key={post.postId} className="xs-pb[20px] sm:pb-[20px] md:pb-[20px] lg:pb-[20px]">
        <PostCardBasic
          size={size}
          imgUrl={post.thumbNail || undefined}
          title={post.title}
          subtitle={post.content}
          date={formattedDate}
          badgeType={status}
          profileImg={''}
          profileName={''}
          className="cursor-pointer"
          onClick={() => handleCardClick(post.postId.toString(), post.postId, navigate)}
        />
      </div>
    );
  }
}
