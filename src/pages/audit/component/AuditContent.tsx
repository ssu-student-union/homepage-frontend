import { useNavigate } from 'react-router-dom';
import { Size } from '@/components/PostCard/const/state';
import { PostCardBasic } from '@/components/PostCard/PostCardBasicMissing';
import { handleCardClick } from '../utils/handleCardClick';
import { formatYYYYMMDD } from '@/utils/formatYYYYMMDD';

interface AuditContentProps {
  posts: {
    postId: number;
    title: string;
    content: string;
    date: string;
    thumbNail: string | null;
    status: 'Emergency' | 'New' | 'Default';
  }[];
  size?: Size;
  className?: string;
}

export function AuditContent({ posts, size = Size.default }: AuditContentProps) {
  const navigate = useNavigate();

  if (size == Size.default) {
    return (
      <div className="flex flex-col justify-between">
        <div className="flex flex-row justify-between pb-[30px]">
          {posts.slice(0, 3).map((post) => (
            <RenderCard key={post.postId} post={post} />
          ))}
        </div>
        <div className="flex flex-row justify-between pb-[30px]">
          {posts.slice(3, 6).map((post) => (
            <RenderCard key={post.postId} post={post} />
          ))}
        </div>
        <div className="flex flex-row justify-between">
          {posts.slice(6, 9).map((post) => (
            <RenderCard key={post.postId} post={post} />
          ))}
        </div>
      </div>
    );
  } else if (size == Size.audit) {
    return (
      <div className="flex flex-col justify-between">
        <div className="flex flex-row justify-between pb-[30px]">
          {posts.slice(0, 3).map((post) => (
            <RenderCard key={post.postId} post={post} />
          ))}
        </div>
        <div className="flex flex-row justify-between">
          {posts.slice(3, 6).map((post) => (
            <RenderCard key={post.postId} post={post} />
          ))}
        </div>
      </div>
    );
  } else if (size == Size.medium || size == Size.mediumSmall || size == Size.small) {
    return (
      <div className="flex flex-col justify-between">
        {posts.map((post) => (
          <RenderCard key={post.postId} post={post} />
        ))}
      </div>
    );
  }

  function RenderCard({ post }: { post: AuditContentProps['posts'][number] }) {
    const formattedDate = post.date ? formatYYYYMMDD(post.date) : '';
    return (
      <div key={post.postId} className="xs-pb[20px] sm:pb-[20px] md:pb-[20px] lg:pb-[20px]">
        <PostCardBasic
          size={size}
          imgUrl={post.thumbNail || undefined}
          title={post.title}
          subtitle={post.content}
          date={formattedDate}
          badgeType={post.status}
          profileImg={''}
          profileName={''}
          className="cursor-pointer"
          onClick={() => handleCardClick(post.postId.toString(), post, navigate)}
        />
      </div>
    );
  }
}
