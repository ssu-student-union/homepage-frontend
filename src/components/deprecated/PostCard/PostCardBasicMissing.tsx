import { Badge } from '../../ui/badge';
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

  const removeTags = subtitle.replace(/<\/?[^>]+(>|$)/g, '');

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
        {badgeType === 'Emergency' && <Badge variant="emergency-old">긴급</Badge>}
        {badgeType === 'New' && <Badge variant="new-old">NEW!</Badge>}
        <div className={`flex size-full ${styles.gap}`}>
          <img alt="image" src={imgUrl} className={`rounded-[8px] bg-gray-200 object-cover ${styles.image}`} />
          <div className="w-full flex-col">
            <div className={cn(`flex flex-col`, styles.textBox)}>
              <p className={cn('line-clamp-2 break-all font-semibold', styles.title)}>{title}</p>
              <p className={cn('font-normal text-gray-500', styles.subtitle)}>{removeTags}</p>
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

/**
 * @deprecated 디자인 변경으로 사용되지 않습니다. 대신 `components/PostCard`를 사용하세요.
 */
export const PostCardBasic = (props: Omit<PostCardProps, 'cardType'>) => <PostCard cardType="Basic" {...props} />;
/**
 * @deprecated 디자인 변경으로 사용되지 않습니다. 대신 `components/PostCard`를 사용하세요.
 */
export const PostCardMissing = (
  props: Omit<PostCardProps, 'cardType' | 'badgeType' | 'profileImg' | 'profileName'>
) => <PostCard cardType="Missing" badgeType="Default" {...props} />;
