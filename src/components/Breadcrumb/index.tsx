import { Link, useLocation } from "react-router-dom";
import { CaretRight } from "@phosphor-icons/react";

interface BreadcrumbProps {
  items?: string[];
  className?: string;
}

const Breadcrumb = ({ items = [], className = "" }: BreadcrumbProps) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav
      className={`flex items-center text-sm font-regular text-[#374151] ${className}`}
    >
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        // items 배열이 비어있다면 라우트 경로로, 아니라면 items 배열 순서대로 문구를 교체
        const itemName = items[index] || value;
        return (
          <span key={to} className="flex items-center">
            {index > 0 && <CaretRight className="size-4 mx-1.5" />}
            <Link to={to} className="hover:text-gray-500">
              {itemName}
            </Link>
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
