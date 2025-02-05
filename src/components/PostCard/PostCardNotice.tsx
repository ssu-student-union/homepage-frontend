import { Badge } from '../ui/badge';
import profileImgDefault from '@/assets/image/profileDefault.png';
import { Pencil } from './const/style';
import useTruncateText from '@/hooks/useTruncateText';
import { statusType } from '@/components/PostCard/type';

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
  onClick,
}: PostCardMainProps) => {
  const truncatedTitle = useTruncateText(title, 24);
  return (
    <div
      onClick={onClick}
      className={`relative flex h-[24.25rem] min-w-[20.6rem] cursor-pointer items-center justify-center rounded-[0.62rem] border border-gray-300 bg-white xs:h-[17.5rem] xs:w-[14.5rem]`}
    >
      {badgeType === '긴급공지' && <Badge variant="Emergency">긴급</Badge>}
      {badgeType === '새로운' && <Badge variant="New">NEW!</Badge>}
      {badgeType === '일반' && <Badge variant="Default"></Badge>}
      <div className={`flex flex-col gap-2.5`}>
        <img
          alt="image"
          src={imgUrl || '/image/default/thumbnail/thumbnail.webp'}
          className={`mt-3 h-[18.75rem] w-[18.75rem] rounded-[0.5rem] bg-gray-200 object-cover xs:h-[13rem] xs:w-[13rem] xs:rounded-[0.35rem]`}
        />
        <div className="w-full flex-col text-lg font-semibold xs:text-xs">
          <p className="line-clamp-1 w-[18.75rem] xs:w-[13rem]">{truncatedTitle}</p>
          <div className={`flex items-center gap-3.5 text-sm font-normal text-gray-500 xs:text-[0.57rem]`}>
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
