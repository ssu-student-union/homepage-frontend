import { useNavigate } from 'react-router-dom';
import { Size } from '@/components/PostCard/const/state';
import { PostCardBasic } from '@/components/PostCard/PostCardBasicMissing';
import { handleCardClick } from '../utils/handleCardClick';

interface AuditContentProps {
  posts: {
    id: string;
    imgUrl?: string;
    title?: string;
    subTitle?: string;
    date?: string;
    badgeType?: 'Emergency' | 'New' | 'Default';
    profileImg?: string;
    profileName?: string;
  }[];
  size?: Size;
}

export function AuditContent({ posts, size = Size.default }: AuditContentProps) {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-3 gap-4 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
      {posts.map((post) => (
        <div
          key={post.id}
          onClick={() => handleCardClick(post.id, post, navigate)} // 여기서 post 객체를 함께 전달
          className="cursor-pointer"
        >
          <PostCardBasic
            size={size}
            imgUrl={post.imgUrl}
            title={post.title}
            subtitle={post.subTitle}
            date={post.date}
            badgeType={post.badgeType}
            profileImg={post.profileImg}
            profileName={post.profileName}
          />
        </div>
      ))}
    </div>
  );
}
