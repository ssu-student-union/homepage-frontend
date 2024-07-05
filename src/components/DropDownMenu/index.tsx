import { FC } from "react";
import { Link } from "react-router-dom";

// MenuItem에 들어갈 값은 "/DropMenu/const/index.tsx"에서 관리합니다.
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

const DropDownMenu: FC<DropDownMenuProps> = ({
  items,
  bgColor,
  textColor,
  hoverBgColor,
}) => {
  return (
    <div className={`w-40 shadow-md rounded-xs ${bgColor}`}>
      {items.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`block px-4 py-3.5 rounded-xs cursor-pointer ${textColor} ${hoverBgColor}`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default DropDownMenu;
