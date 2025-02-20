import { ThumbsUp } from '@/components/PostCard/const/icon';

interface PostCardPetitProps {
  title?: string; // 청원 제목
  subtitle?: string; // 청원 내용
  date?: string; // 청원 게시 날짜
  goodNumber?: number; // 좋아요 갯수
}

const PostCardPetit = ({ title = '', subtitle = '', date, goodNumber = 0 }: PostCardPetitProps) => {
  return (
    <div
      className={`flex h-[9.75rem] w-[15.5rem] cursor-pointer flex-col items-center justify-between rounded-[0.62rem] border 
      border-gray-300 bg-white px-[1.37rem] py-4 sm:h-[15.75rem] sm:w-[22.75rem] sm:rounded-[0.8rem] sm:px-7 
      sm:py-6`}
    >
      <div className={`flex w-full flex-col gap-2 sm:gap-2.5`}>
        <p className="line-clamp-1 text-base font-bold sm:text-[1.37rem]">{title}</p>
        <p className={`line-clamp-2 text-sm font-normal leading-4 text-gray-500 sm:text-lg sm:leading-[1.37rem]`}>
          {subtitle}
        </p>
      </div>
      <div className={`flex w-full items-center justify-between font-normal`}>
        <span className="text-xs text-gray-500 sm:text-base">{date}</span>
        <div className="flex items-center gap-1">
          <ThumbsUp className="size-5 sm:size-6" />
          <span className="pt-[0.1rem] text-xs text-[#FF5151] sm:text-lg">{goodNumber}</span>
        </div>
      </div>
    </div>
  );
};

// PostTextPetitionView => title, subtitle, date, goodNumber 속성 기입해서 사용
export const PostTextPetitionView = (props: PostCardPetitProps) => <PostCardPetit {...props} />;
