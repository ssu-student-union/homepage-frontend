import { FC } from "react";
import { Link } from "react-router-dom";

interface MenuItem {
  name: string;
  path: string;
}

interface DropMenuProps {
  items: MenuItem[];
  bgColor: string;
  textColor: string;
  hoverBgColor: string;
}

const DropMenu: FC<DropMenuProps> = ({ items, bgColor, textColor, hoverBgColor }) => {
  return (
    <div className={`w-40 rounded-xs shadow-md ${bgColor}`}>
      {items.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`block px-4 py-3 cursor-pointer ${textColor} hover: ${hoverBgColor}`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default DropMenu;