import { NavLink } from "react-router-dom";

interface BoardSelectorProp {
  category: string[];
}

export function BoardSelector({ category }: BoardSelectorProp) {
  return (
    <div className="inline-flex p-1 ml-[85px] bg-white border rounded-sm absolute top-[98px]">
      <ul className="flex">
        {category.map((menu, index) => {
          return (
            <li key={index}>
              <NavLink
                to={`/boardTest/${menu}`}
                className={({ isActive }) =>
                  `px-4 py-1 font-bold block ${
                    isActive ? "text-white bg-primary rounded-sm" : "text-black"
                  }`
                }
              >
                {menu}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
