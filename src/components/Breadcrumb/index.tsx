import { Link } from 'react-router-dom';
import { cn } from '@/libs/utils';
import { CaretRight } from '@phosphor-icons/react';

interface BreadcrumbProps {
  // items는 경로 이름(key) : 라우트 경로(value) 구조의 Map 타입 값입니다.
  // 경로가 따로 없을 시 null 처리해주시면 됩니다.
  items?: Map<string, string | null>;

  // tailwind 적용을 위한 className props 추가.
  // ex) <Breadcrumb className = "text-sm"/>
  className?: string;
}

const Breadcrumb = ({
  items = new Map<string, string | null>([
    ['소개', '/intro?category=president&sub-category=intro'],
    ['총학생회', '/intro?category=president&sub-category=intro'],
  ]),
  className = '',
}: BreadcrumbProps) => {
  const pathnames = Array.from(items.keys());

  return (
    <nav className={cn('flex items-center text-base font-medium text-gray-500', className)}>
      {pathnames.map((key, index) => {
        const to = items.get(key);
        return (
          <span key={key} className="flex items-center">
            {index > 0 && <CaretRight />}
            {to ? (
              <Link to={to} className={index == pathnames.length - 1 ? 'text-gray-700' : 'text-gray-500'}>
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
