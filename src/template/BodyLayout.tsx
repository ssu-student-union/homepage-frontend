import Pagination from '@/components/deprecated/Pagination';
import { WriteButton } from '@/components/deprecated/Buttons/BoardActionButtons';
import { Search } from '@/components/deprecated/Search/Search';
import { BodyLayoutProps } from '@/types/layout';
import { cn } from '@/libs/utils';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export function BodyLayout({
  title,
  selector,
  children,
  totalPages,
  currentPage,
  onPageChange,
  onWriteClick,
  authority,
  className = '',
}: BodyLayoutProps) {
  const { t } = useTranslation();
  return (
    <div className={cn('mb-20 px-10 xl:px-[200px]', className)}>
      <div className="text-[1.75rem] font-bold">{title && t(`introduction.${title}`)}</div>
      {selector}
      <div className="mt-[25px] sm:mt-[24px]">
        <main>{children}</main>
        <div className="mt-9 flex max-md:flex-col-reverse md:mt-8 md:justify-between">
          <div className="w-[94px]"></div>
          <div className="flex justify-center">
            {totalPages ? (
              <div className="lg:mt-[66px]">
                <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={onPageChange} />
              </div>
            ) : null}
          </div>
          <div className="flex justify-center md:justify-end">
            {authority?.includes('WRITE') ? <WriteButton onClick={onWriteClick} /> : null}
          </div>
        </div>
      </div>
      <div className="mt-[17px] flex justify-center md:mt-[42px] lg:hidden">
        <Search />
      </div>
    </div>
  );
}

BodyLayout.Skeleton = ({ children }: { children: ReactNode }) => {
  return (
    <div className={cn('mb-20 xl:px-[200px]')}>
      <div className="mt-[25px] sm:mt-[24px]">
        <main>{children}</main>
        <div className="mt-9 flex max-md:flex-col-reverse md:mt-8 md:justify-between">
          <div className="w-[94px]"></div>
        </div>
      </div>
    </div>
  );
};
