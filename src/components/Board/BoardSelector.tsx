import { NavLink } from "react-router-dom";

interface BoardSelectorProp {
  category: string[];
}

export function BoardSelector({ category }: BoardSelectorProp) {
  return (
    <div className=" p-1 ml-[85px] font-bold border bg-white rounded-md absolute top-[252px]">
      <ul className="list-none flex gap-2">
        {category.map((menu) => {
          return (
            <li>
              <NavLink
                to={`/boardTest/${menu}`}
                className={({ isActive }) =>
                  isActive ? "p-1 bg-primary text-white rounded-sm" : "p-1"
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
