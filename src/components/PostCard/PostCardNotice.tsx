import { Badge } from '../ui/badge';
import profileImgDefault from '@/assets/image/profileDefault.png';
import useTruncateText from '@/hooks/useTruncateText';
import { statusType } from '@/components/PostCard/type';
import { Pencil } from '@/components/PostCard/const/icon';

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
      className={`
        relative flex
        h-[387px] w-[330px] 
        cursor-pointer items-center justify-center rounded-[0.62rem] border border-gray-300 bg-white
        xs:h-[98px] xs:w-full xs:justify-start xs:px-[12px]
        sm:h-[98px] sm:w-full sm:justify-start sm:px-[12px]
        md:h-[277px] md:w-[232px]
        lg:h-[277px] lg:w-[232px]
        `}
    >
      {badgeType === '긴급공지' && <Badge variant="Emergency">긴급</Badge>}
      {badgeType === '새로운' && <Badge variant="New">NEW!</Badge>}
      {badgeType === '일반' && <Badge variant="Default"></Badge>}
      <div className="flex flex-col gap-2.5 xs:flex-row sm:flex-row ">
        <img
          alt="image"
          src={imgUrl || '/image/default/thumbnail/thumbnail.webp'}
          className={`
            h-[18.75rem] w-[18.75rem] 
            rounded-[0.5rem] bg-gray-200 object-cover 
            xs:h-[64px] xs:w-[64px] xs:rounded-[4px]
            sm:h-[64px] sm:w-[64px] sm:rounded-[4px]
            md:mt-1 md:h-[206px] md:w-[208px]
            lg:mt-1 lg:h-[206px] lg:w-[208px]
          `}
        />
        <div
          className="
          w-full 
          flex-col text-lg font-semibold 
          xs:w-[calc(90vw-100px)] xs:text-xs
          sm:w-[calc(90vw-100px)] sm:text-xs
          md:text-xs lg:text-xs
          "
        >
          <p
            className="mb-1 line-clamp-1 w-[18.75rem] 
            xs:w-[13rem] md:w-[208px] lg:w-[208px]"
          >
            {truncatedTitle}
          </p>
          {subtitle && (
            <p className="mb-1 line-clamp-2 h-[24px] w-[calc(85vw-100px)] text-[12px] font-medium text-gray-600">
              {subtitle}
            </p>
          )}
          <div
            className={`
              flex items-center gap-3.5 text-sm font-normal text-gray-500 
              xs:justify-between xs:text-[10px] sm:justify-between sm:text-[10px] md:text-[9px] lg:text-[9px]
            `}
          >
            <div className="flex items-center gap-1">
              <img alt="logo" src={profileImg} className={`h-4 w-4 pr-0.5 xs:h-3.5 xs:w-3.5`} />
              <span>{profileName}</span>
            </div>
            <div className="flex items-center gap-1">
              <Pencil className="h-3.5 w-3.5 xs:h-3 xs:w-3" />
              <span>{date}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// PostCardNotice => imgUrl, title, subtitle, date, badgeType, size, profileImg, profileName 속성 기입해서 사용
export const PostCardNotice = (props: PostCardMainProps) => <PostCardMain {...props} />;
