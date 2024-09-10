import { cn } from '@/libs/utils';
import { Badge } from '../ui/badge';
import { Size } from './const/state';
import { getStyles } from './const/style';

interface PostCardProps {
  imgUrl?: string; // 게시글 이미지 url
  title?: string; // 게시글 제목
  subtitle?: string; // 게시글 내용
  date?: string; // 게시글 게시 날짜
  badgeType?: 'Emergency' | 'New' | 'Default'; // postCard 배지 종류 - 긴급, NEW!, 없음
  cardType: 'Basic' | 'Missing'; // PostCardBasic | PostCardMissing 컴포넌트 선택
  size?: Size; // 페이지마다 반응형 기준이 다름 -> 자동 반응형이 아니라 수동으로 적용하도록 제작
  profileImg?: string | null; // 프로필 이미지
  profileName?: string; // 계정명
  onClick?: () => void;
  className?: string;
}

const PostCard = ({
  imgUrl,
  title = '',
  subtitle = '',
  date,
  badgeType,
  cardType,
  size = Size.default,
  profileImg,
  profileName = '',
  onClick = () => {},
  className = '',
}: PostCardProps) => {
  const styles = getStyles(size);

  return (
    <div
      className={cn(
        `relative flex cursor-pointer items-center justify-center rounded-[10px] border border-gray-300 bg-white text-xs`,
        styles.container,
        className
      )}
      onClick={onClick}
    >
      {badgeType === 'Emergency' && <Badge variant="Emergency">긴급</Badge>}
      {badgeType === 'New' && <Badge variant="New">NEW!</Badge>}
      {badgeType === 'Default' && <Badge variant="Default"></Badge>}
      <div className={`flex h-full w-full ${styles.gap}`}>
        <img alt="image" src={imgUrl} className={`rounded-[8px] bg-gray-200 object-cover ${styles.image}`} />
        <div className="w-full flex-col">
          <div className={`flex flex-col ${styles.title}`}>
            <p className={`line-clamp-2 font-semibold`}>{title}</p>
            <p className={`line-clamp-2 font-normal text-gray-500 ${styles.subtitle}`}>{subtitle}</p>
          </div>
          <hr className={`w-full border border-gray-300 ${styles.hr}`} />
          <div className={`flex items-end gap-1 font-normal text-gray-500 ${styles.date}`}>
            {cardType === 'Basic' && (
              <div className="flex items-center gap-1">
                {profileImg && <img alt="logo" src={profileImg} className={`pr-0.5 ${styles.profileImg}`} />}
                {profileName && <span>{profileName}</span>}
                {profileName && <span>·</span>} {/* 프로필 이름이 있으면 center dot 렌더링 */}
              </div>
            )}
            <span>{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// PostCardBasic => imgUrl, title, subtitle, date, badgeType, size, profileImg, profileName 속성 기입해서 사용
export const PostCardBasic = (props: Omit<PostCardProps, 'cardType'>) => <PostCard cardType="Basic" {...props} />;

// PostCardMissing => imgUrl, title, subtitle, date, size 속성 기입해서 사용
export const PostCardMissing = (
  props: Omit<PostCardProps, 'cardType' | 'badgeType' | 'profileImg' | 'profileName'>
) => <PostCard cardType="Missing" badgeType="Default" {...props} />;
