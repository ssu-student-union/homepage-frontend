import { Link } from 'react-router-dom';

// MenuItem에 들어갈 값은 "/Header/const/pathData"에서 관리합니다.
interface MenuItem {
  name: string;
  path: string;
}

interface DropDownMenuProps {
  items: MenuItem[];
  bgColor: string;
  textColor: string;
  hoverBgColor: string;
}

const DropDownMenu = ({ items, bgColor, textColor, hoverBgColor }: DropDownMenuProps) => {
  return (
    // prettier ignore
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
