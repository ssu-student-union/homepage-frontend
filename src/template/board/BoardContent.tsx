import { Size } from '@/components/PostCard/const/state';
import { PostCardBasic } from '@/components/PostCard/PostCardBasicMissing';
import { useResponseBoard } from '@/hooks/useResponseBoard';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BoardContentLoading from './BoardContentLoading';
import { formatYYYYMMDD } from '@/utils/formatYYYYMMDD';

interface BoardContentProps {
  boardName: string;
  data?: any[];
  className?: string;
  isLoading: boolean;
}

export function BoardContent({ boardName, data, isLoading }: BoardContentProps) {
  const navigate = useNavigate();
  const { size } = useResponseBoard();
  const screenWidth: number = window.innerWidth;
  const [posts, setPosts] = useState(data);

  useEffect(() => {
    setPosts(data);
  }, [data]);

  if (isLoading) {
    return <BoardContentLoading screenWidth={screenWidth} />;
  } else {
    if (!posts || posts.length === 0) {
      return (
        <div className="flex h-[32rem] w-full items-center justify-center text-gray-600">등록된 게시물이 없습니다</div>
      );
    }
    if (screenWidth >= 1920) {
      return (
        <div className="flex flex-col justify-start">
          <div className="flex flex-row justify-start pb-[30px]">
            {posts.slice(0, 3).map((post) => (
              <RenderCard key={post.postId} post={post} size={size} boardName={boardName} />
            ))}
          </div>
          <div className="flex flex-row justify-start pb-[30px]">
            {posts.slice(3, 6).map((post) => (
              <RenderCard key={post.postId} post={post} size={size} boardName={boardName} />
            ))}
          </div>
          <div className="flex flex-row justify-start">
            {posts.slice(6, 9).map((post) => (
              <RenderCard key={post.postId} post={post} size={size} boardName={boardName} />
            ))}
          </div>
        </div>
      );
    } else if (screenWidth >= 1440 && screenWidth < 1920) {
      return (
        <div className="flex flex-col justify-start">
          <div className="flex flex-row justify-start pb-[30px]">
            {posts.slice(0, 2).map((post) => (
              <RenderCard key={post.postId} post={post} size={size} boardName={boardName} />
            ))}
          </div>
          <div className="flex flex-row justify-start pb-[30px]">
            {posts.slice(2, 4).map((post) => (
              <RenderCard key={post.postId} post={post} size={size} boardName={boardName} />
            ))}
          </div>
          <div className="flex flex-row justify-start">
            {posts.slice(4, 6).map((post) => (
              <RenderCard key={post.postId} post={post} size={size} boardName={boardName} />
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col justify-between">
          {posts.map((post) => (
            <RenderCard key={post.postId} post={post} size={size} boardName={boardName} />
          ))}
        </div>
      );
    }
  }

  interface RenderCardProps {
    post: any;
    size: Size;
    boardName: string;
  }

  function RenderCard({ post, size, boardName }: RenderCardProps) {
    const formattedDate = post.date ? formatYYYYMMDD(post.date) : '';
    let thumbnail = post.thumbNail || undefined;

    let status: 'Emergency' | 'New' | 'Default';
    if (post.status === '긴급공지') {
      status = 'Emergency';
    } else if (post.status === '새로운') {
      status = 'New';
    } else {
      status = 'Default';
    }
    if (status === 'Emergency' && thumbnail === undefined) {
      thumbnail = `image/default/thumbnail/thumbnail_299px.png`;
    }
    return (
      <div
        key={post.postId}
        className="xs-pb[20px] pr-[1.5rem] xs:pr-0 sm:pb-[20px] sm:pr-0 md:pb-[20px] md:pr-0 lg:pb-[20px] lg:pr-0"
      >
        <PostCardBasic
          size={size}
          imgUrl={thumbnail ? thumbnail : `image/default/thumbnail/default_thumbnail.png`}
          title={post.title}
          subtitle={post.content}
          date={formattedDate}
          badgeType={status}
          profileName={post.author}
          className="cursor-pointer"
          onClick={() => navigate(`/${boardName}/${post.postId}`, { state: { postId: post.postId } })}
        />
      </div>
    );
  }
}
