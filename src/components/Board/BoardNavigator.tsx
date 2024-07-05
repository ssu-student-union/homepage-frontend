import { NavLink, useParams } from "react-router-dom";

interface BoardNavigatorProp {
  subcategory: string[];
}

export function BoardNavigator({ subcategory }: BoardNavigatorProp) {
  const { category } = useParams() as { category: string };
  return (
    <div className="p-2">
      <ul className="flex flex-wrap gap-[6px]">
        {subcategory.map((title, index) => {
          return (
            <li key={index} className="mb-4">
              <NavLink
                to={`/boardTest/${category}/${title}`}
                className={({ isActive }) =>
                  `h-[37px] px-4 py-2 border rounded-[32px] font-bold ${
                    isActive
                      ? " border-primary bg-primary text-white"
                      : "border-black bg-white text-black hover:bg-primary hover:text-white hover:border-primary"
                  }`
                }
              >
                {title}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
