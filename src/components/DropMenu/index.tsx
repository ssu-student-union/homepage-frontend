import { FC } from "react";
import { Link } from "react-router-dom";

interface MenuItem {
  name: string;
  path: string;
}

interface DropMenuProps {
  items: MenuItem[];
}

const DropMenu: FC<DropMenuProps> = ({ items }) => {
  return (
    <div className="w-56 bg-white shadow-md rounded-md p-1">
      {items.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className="block px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default DropMenu;
