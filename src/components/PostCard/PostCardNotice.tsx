import { Badge } from '../ui/badge';
import profileImgDefault from '@/assets/image/profileDefault.png';
import { Pencil } from './const/style';

interface PostCardMainProps {
  imgUrl?: string; // 게시글 이미지 url
  title?: string; // 게시글 제목
  subtitle?: string; // 게시글 내용
  date?: string; // 게시글 게시 날짜
  badgeType?: 'Emergency' | 'New' | 'Default'; // postCard 배지 종류 - 긴급, NEW!, 없음
  profileImg?: string; // 프로필 이미지
  profileName?: string; // 계정명
}

const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
};

const PostCardMain = ({
  imgUrl,
  title = '',
  date,
  badgeType,
  profileImg = profileImgDefault, // default 프로필이미지 - 추후 변경 또는 삭제
  profileName = 'US:SUM', // default 계정명 - 추후 변경 또는 삭제
}: PostCardMainProps) => {
  return (
    <div
      className={`relative flex h-[24.25rem] w-[20.6rem] cursor-pointer items-center justify-center rounded-[0.62rem] border border-gray-300 bg-white xs:h-[17.5rem] xs:w-[14.5rem]`}
    >
      {badgeType === 'Emergency' && <Badge variant="Emergency">긴급</Badge>}
      {badgeType === 'New' && <Badge variant="New">NEW!</Badge>}
      {badgeType === 'Default' && <Badge variant="Default"></Badge>}
      <div className={`flex flex-col gap-2.5`}>
        <img
          alt="image"
          src={imgUrl}
          className={`mt-3 h-[18.75rem] w-[18.75rem] rounded-[0.5rem] bg-gray-200 object-cover xs:h-[13rem] xs:w-[13rem] xs:rounded-[0.35rem]`}
        />
        <div className="w-full flex-col text-lg font-semibold xs:text-xs">
          <p>{truncateText(title, 23)}</p>
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
