import { Link } from 'react-router-dom';
import { MenuItem } from '@/containers/common/Header/const/pathData.tsx';
import { useTranslation } from 'react-i18next';
import { cn } from '@/libs/utils';

interface DropDownMenuProps {
  items: MenuItem[];
  bgColor: string;
  textColor: string;
  hoverBgColor: string;
}

const DropDownMenu = ({ items, bgColor, textColor, hoverBgColor }: DropDownMenuProps) => {
  const { t, i18n } = useTranslation();
  const textSize = i18n.language === 'en' ? 'text-xs' : 'text-base';

  return (
    <div className={`absolute end-0 left-0 w-40 rounded-xs font-semibold shadow-md ${bgColor} mt-1.5`}>
      {items.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={cn(`block cursor-pointer rounded-xs px-4 py-3.5 text-base ${textColor} ${hoverBgColor}`, textSize)}
        >
          {t(`header-items.${item.name}`)}
        </Link>
      ))}
    </div>
  );
};

export default DropDownMenu;
