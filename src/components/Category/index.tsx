import { NavLink } from "react-router-dom";

interface CategoryProps {
  path: string;
  onSelect(content: string): void;
  children: string;
}

export function Category({ path, onSelect, children }: CategoryProps) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `px-4 py-2 rounded-full font-medium ${
          isActive
            ? "bg-blue-600 text-white"
            : "bg-white text-black border border-gray-300 hover:bg-gray-100"
        }`
      }
      onClick={() => onSelect(children)}
    >
      {children}
    </NavLink>
  );
}
