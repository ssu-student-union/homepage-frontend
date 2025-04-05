import { Badge } from '../../ui/badge';
import profileImgDefault from '@/assets/image/profileDefault.png';
import useTruncateText from '@/hooks/useTruncateText';
import { statusType } from '@/components/deprecated/PostCard/type';
import { Pencil } from '@/components/deprecated/PostCard/const/icon';

interface PostCardMainProps {
  imgUrl?: string; // 게시글 이미지 url
  title?: string; // 게시글 제목
  subtitle?: string; // 게시글 내용
  date?: string; // 게시글 게시 날짜
  badgeType?: statusType; // postCard 배지 종류 - 긴급, NEW!, 없음
  profileImg?: string; // 프로필 이미지
  profileName?: string; // 계정명
  onClick?: () => void;
}

const PostCardMain = ({
  imgUrl,
  title = '',
  date,
  badgeType,
  profileImg = profileImgDefault, // default 프로필이미지 - 추후 변경 또는 삭제
  profileName = 'US:SUM', // default 계정명 - 추후 변경 또는 삭제
  subtitle,
  onClick,
}: PostCardMainProps) => {
  const truncatedTitle = useTruncateText(title, 24);
  return (
    <div
      onClick={onClick}
      className="relative flex h-[98px] w-full cursor-pointer items-center justify-start rounded-[0.62rem] border border-gray-300 bg-white px-[12px] md:h-[277px] md:w-[232px] md:justify-center xl:h-[387px] xl:w-[330px]"
    >
      {badgeType === '긴급공지' && <Badge variant="emergency-old">긴급</Badge>}
      {badgeType === '새로운' && <Badge variant="new-old">NEW!</Badge>}
      <div className="flex flex-row gap-2.5 md:flex-col">
        <img
          alt="image"
          src={imgUrl || '/image/default/thumbnail/thumbnail.webp'}
          className="size-[64px] rounded-[4px] bg-gray-200 object-cover md:mt-1 md:h-[206px] md:w-[208px] md:rounded-[0.5rem] xl:mt-0 xl:size-[18.75rem]"
        />
        <div className="w-[calc(90vw-100px)] flex-col text-xs font-semibold md:w-full xl:text-lg">
          <p className="mb-1 line-clamp-1 w-52 md:w-[208px] xl:w-[18.75rem]">{truncatedTitle}</p>
          {subtitle && (
            <p className="mb-1 line-clamp-2 h-[24px] w-[calc(85vw-100px)] text-[12px] font-medium text-gray-600">
              {subtitle}
            </p>
          )}
          <div className="flex items-center justify-between gap-3.5 text-[10px] font-normal text-gray-500 md:justify-start md:text-[9px] xl:text-sm">
            <div className="flex items-center gap-1">
              <img alt="logo" src={profileImg} className={`size-3.5 pr-0.5 sm:size-4`} />
              <span>{profileName}</span>
            </div>
            <div className="flex items-center gap-1">
              <Pencil className="size-3 sm:size-3.5" />
              <span>{date}</span>
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
export const PostCardNotice = (props: PostCardMainProps) => <PostCardMain {...props} />;
