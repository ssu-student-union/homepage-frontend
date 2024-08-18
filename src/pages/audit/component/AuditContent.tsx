import { useNavigate } from 'react-router-dom';
import { Size } from '@/components/PostCard/const/state';
import { PostCardBasic } from '@/components/PostCard/PostCardBasicMissing';
import { handleCardClick } from '../utils/handleCardClick';
import { formatYYYYMMDD } from '@/utils/formatYYYYMMDD';

interface AuditContentProps {
  posts: {
    id: string;
    imgUrl?: string;
    title: string;
    subTitle: string;
    date: string;
    badgeType?: 'Emergency' | 'New' | 'Default';
    profileImg: string;
    profileName: string;
    contentText: string;
    contentImages: string[];
    file: { fileName: string; fileUrl: string };
  }[];
  size?: Size;
  className?: string;
}

export function AuditContent({ posts, size = Size.default }: AuditContentProps) {
  const navigate = useNavigate();

  if (posts.length == 9) {
    return (
      <div className="flex flex-col justify-between">
        <div className="flex flex-row justify-between pb-[30px]">
          {posts.slice(0, 3).map((post) => (
            <RenderCard key={post.id} post={post} />
          ))}
        </div>
        <div className="flex flex-row justify-between pb-[30px]">
          {posts.slice(3, 6).map((post) => (
            <RenderCard key={post.id} post={post} />
          ))}
        </div>
        <div className="flex flex-row justify-between">
          {posts.slice(6, 9).map((post) => (
            <RenderCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    );
  } else if (posts.length == 6) {
    return (
      <div className="flex flex-col justify-between">
        <div className="flex flex-row justify-between pb-[30px]">
          {posts.slice(0, 3).map((post) => (
            <RenderCard key={post.id} post={post} />
          ))}
        </div>
        <div className="flex flex-row justify-between">
          {posts.slice(3, 6).map((post) => (
            <RenderCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    );
  } else if (posts.length == 5) {
    return (
      <div className="flex flex-col justify-between">
        {posts.map((post) => (
          <RenderCard key={post.id} post={post} />
        ))}
      </div>
    );
  } else if (posts.length > 0) {
    return (
      <div className="flex flex-col justify-between">
        {posts.map((post) => (
          <RenderCard key={post.id} post={post} />
        ))}
      </div>
    );
  } else {
    return <p>네트워크 에러</p>;
  }

  function RenderCard({ post }: { post: AuditContentProps['posts'][number] }) {
    const formattedDate = post.date ? formatYYYYMMDD(post.date) : '';
    return (
      <div key={post.id} className="xs-pb[20px] sm:pb-[20px] md:pb-[20px] lg:pb-[20px]">
        <PostCardBasic
          size={size}
          imgUrl={post.imgUrl}
          title={post.title}
          subtitle={post.subTitle}
          date={formattedDate}
          badgeType={post.badgeType}
          profileImg={post.profileImg}
          profileName={post.profileName}
          className="cursor-pointer"
          onClick={() => handleCardClick(post.id, post, navigate)}
        />
      </div>
    );
  }
}
