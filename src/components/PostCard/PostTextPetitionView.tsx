import { ThumbsUp } from './const/style';

interface PostCardPetitProps {
  title?: string; // 청원 제목
  subtitle?: string; // 청원 내용
  date?: string; // 청원 게시 날짜
  goodNumber?: number; // 좋아요 갯수
}

const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
};

const PostCardPetit = ({ title = '', subtitle = '', date, goodNumber = 0 }: PostCardPetitProps) => {
  return (
    <div
      className={`flex h-[15.75rem] w-[22.75rem] cursor-pointer flex-col items-center justify-between rounded-[0.8rem] border 
      border-gray-300 bg-white px-7 py-6 xs:h-[9.75rem] xs:w-[15.5rem] xs:rounded-[0.62rem] xs:px-[1.37rem] 
      xs:py-4`}
    >
      <div className={`flex w-full flex-col gap-2.5 xs:gap-2`}>
        <p className="text-[1.37rem] font-bold xs:text-base">{truncateText(title, 17)}</p>
        <p className={`text-lg font-normal leading-[1.37rem] text-gray-500 xs:text-sm xs:leading-4`}>
          {truncateText(subtitle, 45)}
        </p>
      </div>
      <div className={`flex w-full items-center justify-between font-normal`}>
        <span className="text-base text-gray-500 xs:text-xs">{date}</span>
        <div className="flex items-center gap-1">
          <ThumbsUp className="h-6 w-6 xs:h-5 xs:w-5" />
          <span className="pt-[0.1rem] text-lg text-[#FF5151] xs:text-xs">{goodNumber}</span>
        </div>
      </div>
    </div>
  );
};

// PostTextPetitionView => title, subtitle, date, goodNumber 속성 기입해서 사용
export const PostTextPetitionView = (props: PostCardPetitProps) => <PostCardPetit {...props} />;
