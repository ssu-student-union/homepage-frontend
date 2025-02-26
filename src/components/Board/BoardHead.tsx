import { cn } from '@/libs/utils';
import { useTranslation } from 'react-i18next';

interface BoardHeadProp {
  title: string;
  subtitle: React.ReactNode;
  mainStyle?: string;
  subStyle?: string;
}

export function BoardHead({ title, subtitle, mainStyle = '', subStyle = '' }: BoardHeadProp) {
  const { t } = useTranslation();
  return (
    <div className="block">
      <div className={cn(`mb-1 font-pretendard text-[2.125rem] font-bold text-black`, mainStyle)}>
        {t(`introduction.${title}`)}
      </div>
      <div className={cn(`text-base font-bold text-gray-700 sm:text-[14px]`, subStyle)}>{subtitle}</div>
    </div>
  );
}
