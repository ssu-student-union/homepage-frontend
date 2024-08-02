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
    <div className={`absolute left-0 end-0 w-40 shadow-md rounded-xs font-semibold ${bgColor} mt-1.5`}>
      {items.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`block px-4 py-3.5 rounded-xs cursor-pointer text-base ${textColor} ${hoverBgColor}`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default DropDownMenu;
