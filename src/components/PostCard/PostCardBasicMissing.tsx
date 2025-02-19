import useTruncateText from '@/hooks/useTruncateText';
import { Badge } from '../ui/badge';
import { Size } from './const/state';
import { getStyles } from './const/style';
import { cn } from '@/libs/utils';

interface PostCardProps {
  imgUrl?: string;
  title?: string;
  subtitle?: string;
  date?: string;
  badgeType?: 'Emergency' | 'New' | 'Default';
  cardType: 'Basic' | 'Missing';
  size?: Size;
  profileImg?: string | null;
  profileName?: string;
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
  profileName,
  size = Size.default,
  onClick = () => {},
  className = '',
}: PostCardProps) => {
  const styles = getStyles(size);

  const maxTitleLength = size === Size.default ? 12 : 8;
  const maxSubtitleLength = size === Size.default ? 24 : 18;

  const truncatedTitle = title.slice(0, 4) + useTruncateText(title.slice(4), maxTitleLength as number);
  const truncatedSubtitle = useTruncateText(subtitle, maxSubtitleLength as number);

  return (
    <div className="relative">
      <div
        className={cn(
          `flex min-w-[250px] cursor-pointer items-center justify-center rounded-[10px] border border-gray-300 bg-white text-xs`,
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
              <p className={`line-clamp-2 font-semibold`}>{truncatedTitle}</p>
              <p className={`line-clamp-2 font-normal text-gray-500 ${styles.subtitle}`}>{truncatedSubtitle}</p>
            </div>
            <hr className={`w-full border border-gray-300 ${styles.hr}`} />
            <div className={`flex items-end gap-1 font-normal text-gray-500 ${styles.date}`}>
              {cardType === 'Basic' && (
                <div className="relative flex items-baseline">
                  <span>
                    {profileName} {profileName && '•'}
                  </span>
                  <span>{date}</span>
                </div>
              )}
              {cardType === 'Missing' && <span>{date}</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PostCardBasic = (props: Omit<PostCardProps, 'cardType'>) => <PostCard cardType="Basic" {...props} />;
export const PostCardMissing = (
  props: Omit<PostCardProps, 'cardType' | 'badgeType' | 'profileImg' | 'profileName'>
) => <PostCard cardType="Missing" badgeType="Default" {...props} />;
