import { Link } from 'react-router-dom';
import { MenuItem } from '@/containers/common/Header/const/pathData.tsx';

interface DropDownMenuProps {
  items: MenuItem[];
  bgColor: string;
  textColor: string;
  hoverBgColor: string;
}

const DropDownMenu = ({ items, bgColor, textColor, hoverBgColor }: DropDownMenuProps) => {
  return (
    <div className={`absolute end-0 left-0 w-40 rounded-xs font-semibold shadow-md ${bgColor} mt-1.5`}>
      {items.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`block cursor-pointer rounded-xs px-4 py-3.5 text-base ${textColor} ${hoverBgColor}`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default DropDownMenu;
