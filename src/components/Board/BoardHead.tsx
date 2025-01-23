import { cn } from '@/libs/utils';

interface BoardHeadProp {
  title: string;
  subtitle: React.ReactNode;
  mainStyle?: string;
  subStyle?: string;
}

export function BoardHead({ title, subtitle, mainStyle = '', subStyle = '' }: BoardHeadProp) {
  return (
    <div className="block">
      <div className={cn(`mb-1 font-pretendard text-[2.125rem] font-bold text-black`, mainStyle)}>{title}</div>
      <div className={cn(`text-base font-bold text-gray-700 sm:text-[14px] text-sm`, subStyle)}>{subtitle}</div>
    </div>
  );
}
