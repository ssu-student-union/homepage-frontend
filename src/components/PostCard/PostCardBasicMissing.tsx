import { Badge } from "../ui/badge";
import { Logo } from "../Logo/Logo";
import { Size } from "./const/state";
import { getStyles } from "./const/style";

interface PostCardProps {
  title?: string;
  subtitle?: string;
  date?: string;
  badgeType?: "Emergency" | "New" | "Default"; // postCard 배지 종류 - 긴급, NEW!, 없음
  cardType: "Basic" | "Missing";
  size?: Size;  // 페이지마다 반응형 기준이 다름 -> 자동 반응형이 아니라 수동으로 적용하도록 제작
}

const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
};

const PostCard = ({ 
  title, 
  subtitle = "", 
  date, 
  badgeType, 
  cardType, 
  size = Size.default 
}: PostCardProps) => {
  const styles = getStyles(size);

  return (
    <div
      className={`relative bg-white border border-gray-300 flex justify-center items-center rounded-[10px] cursor-pointer text-xs ${styles.container}`}
    >
      {badgeType === "Emergency" && <Badge variant="Emergency">긴급</Badge>}
      {badgeType === "New" && <Badge variant="New">NEW!</Badge>}
      {badgeType === "Default" && <Badge variant="Default"></Badge>}
      <div className={`h-full w-full flex ${styles.gap}`}>
        <img
          alt="imageUrl"
          src="imageUrl"
          className={`bg-gray-200 rounded-[8px] ${styles.image}`}
        />
        <div className="flex-col w-full">
          <div className={`flex-col ${styles.title}`}>
            <p className={`font-semibold mb-3`}>{title}</p>
            <p className={`text-gray-500 font-normal ${styles.subtitle}`}>
              {truncateText(subtitle, 35)}
            </p>
          </div>
          <hr className={`border border-gray-300 w-full ${styles.hr}`} />
          <div
            className={`flex gap-1 items-end text-gray-500 font-normal ${styles.date}`}
          >
            {cardType === "Basic" && (
              <div className="flex gap-1 items-center">
                <Logo size={`${styles.logoSize}`} fill="#6B7280" />
                <span>US:SUM ·</span>
              </div>
            )}
            <span>{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// PostCardBasic => title, subtitle, date, badgeType, size 속성 기입해서 사용
export const PostCardBasic = (props: Omit<PostCardProps, 'cardType'>) => (
  <PostCard cardType="Basic" {...props} />
);

// PostCardBasic => title, subtitle, date, size 속성 기입해서 사용
export const PostCardMissing = (props: Omit<PostCardProps, 'cardType' | 'badgeType'>) => (
  <PostCard cardType="Missing" badgeType="Default" {...props} />
);
