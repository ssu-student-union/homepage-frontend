import { Link } from 'react-router-dom';

import { cn } from '@/libs/utils';

interface BreadcrumbProps {
  items: Map<string, string | null>;
  className?: string;
}

const Breadcrumb = ({ items, className = '' }: BreadcrumbProps) => {
  const pathnames = Array.from(items.keys());

  return (
    <nav className={cn('flex items-center text-[18px] font-semibold text-gray-700', className)}>
      {pathnames.map((key, index) => {
        const to = items.get(key);
        return (
          <span key={key} className="flex items-center">
            {index > 0 && <span className="px-[3px]">&gt;</span>}
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
