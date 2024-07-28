import { Link } from "react-router-dom";
import { CaretRight } from "@phosphor-icons/react";

interface BreadcrumbProps {
  items: Map<string, string | null>;
  className?: string;
}

const Breadcrumb = ({ items, className = "" }: BreadcrumbProps) => {
  const pathnames = Array.from(items.keys());

  return (
    <nav
      className={`flex items-center text-sm font-regular text-[#374151] ${className}`}
    >
      {pathnames.map((key, index) => {
        const to = items.get(key);
        return (
          <span key={key} className="flex items-center">
            {index > 0 && <CaretRight className="size-4 mx-1.5" />}
            {to ? (
              <Link to={to} className="hover:text-gray-500">
                {key}
              </Link>
            ) : (
              <div>{key}</div>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
