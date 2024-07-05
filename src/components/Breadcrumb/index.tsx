import React from "react";
import { Link, useLocation } from "react-router-dom";
import { CaretRight } from "@phosphor-icons/react";

interface BreadcrumbProps {
  // 교체 문구 ex. items 값이 ["공지사항", "게시물1"]이고 라우트 경로가 a/b라면 공지사항 > 게시물1로 표시
  items?: string[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items = [] }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="flex items-center text-sm font-regular text-[#7E7E7E]">
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        // items 배열이 비어있다면 라우트 경로로, 아니라면 items 배열 순서대로 문구를 교체
        const itemName = items[index] || value;
        return (
          <span key={to} className="flex items-center">
            {index > 0 && <CaretRight className="size-4 mx-1.5" />}
            <Link to={to} className="hover:text-gray-900">
              {itemName}
            </Link>
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
