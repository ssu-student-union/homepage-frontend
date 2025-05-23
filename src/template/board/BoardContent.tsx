import { Size } from '@/components/deprecated/PostCard/const/state';
import { PostCardBasic } from '@/components/deprecated/PostCard/PostCardBasicMissing';
import { useResponseBoard } from '@/hooks/useResponseBoard';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import BoardContentLoading from './BoardContentLoading';
import { formatYYYYMMDD } from '@/utils/formatYYYYMMDD';
import { nameToUrl } from './boardData';

interface Post {
  postId: string | number;
  title: string;
  content?: string;
  date?: string;
  author?: string;
  thumbNail?: string;
  status?: string;
}

interface BoardContentProps<T extends Post> {
  boardName: string;
  data?: T[];
  className?: string;
  isLoading: boolean;
  isDenied?: boolean;
  isPartnership?: boolean;
}

export function BoardContent<T extends Post>({
  boardName,
  data,
  isLoading,
  isPartnership = false,
  isDenied = false,
}: BoardContentProps<T>) {
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
        <div className="flex flex-col">
          {posts.map((post) => (
            <RenderCard key={post.postId} post={post} size={size} boardName={boardName} />
          ))}
        </div>
      );
    }
  }

  interface RenderCardProps<T extends Post> {
    post: T;
    size: Size;
    boardName: string;
  }

  function RenderCard<T extends Post>({ post, size, boardName }: RenderCardProps<T>) {
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
      <div key={post.postId} className="pb-[20px] pr-0 xl:pb-0 xl:pr-6">
        <PostCardBasic
          size={size}
          imgUrl={thumbnail ? thumbnail : `image/default/thumbnail/default_thumbnail.png`}
          title={post.title}
          subtitle={post.content}
          date={formattedDate}
          badgeType={status}
          profileName={post.author}
          className="cursor-pointer"
          onClick={
            isPartnership
              ? () => {
                  if (isDenied) {
                    const check = window.confirm('제휴 안내는 로그인된 사용자만 볼 수 있습니다. 로그인 하시겠습니까?');
                    if (check) {
                      navigate('/register');
                    } else {
                      return;
                    }
                  } else {
                    navigate(`/partnership/${post.postId}`, { state: { postId: post.postId } });
                  }
                }
              : () => navigate(`/${nameToUrl.get(boardName)}/${post.postId}`, { state: { postId: post.postId } })
          }
        />
      </div>
    );
  }
}
