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
}

export function AuditContent({ posts, size = Size.default }: AuditContentProps) {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-3 gap-6 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
      {posts.map((post) => {
        const formattedDate = post.date ? formatYYYYMMDD(post.date) : '';

        return (
          <div key={post.id} onClick={() => handleCardClick(post.id, post, navigate)} className="cursor-pointer">
            <PostCardBasic
              size={size}
              imgUrl={post.imgUrl}
              title={post.title}
              subtitle={post.subTitle}
              date={formattedDate}
              badgeType={post.badgeType}
              profileImg={post.profileImg}
              profileName={post.profileName}
            />
          </div>
        );
      })}
    </div>
  );
}
