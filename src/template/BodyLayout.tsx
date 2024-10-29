import Pagination from '@/components/Pagination';
import { WriteButton } from '@/components/Buttons/BoardActionButtons';
import { Search } from '@/components/Search/Search';
import { BodyLayoutProps } from '@/types/layout';
import { cn } from '@/libs/utils';

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
  return (
    <div className={cn(className, 'mb-20 px-[200px] xs:px-10 sm:px-10 md:px-10 lg:px-10')}>
      <div className="text-[1.75rem] font-bold">{title}</div>
      {selector}
      <div className="mt-[24px] xs:mt-[25px] ">
        <main>{children}</main>
        <div className="flex xs:mt-9 xs:flex-col-reverse sm:mt-9 sm:flex-col-reverse md:mt-8 md:justify-between lg:mt-8 lg:justify-between xl:mt-8 xl:justify-between xxl:mt-8 xxl:justify-between">
          <div className="w-[94px]"></div>
          <div className="flex justify-center">
            {totalPages ? (
              <div className="lg:mt-[66px] xl:mt-[66px] xxl:mt-[66px]">
                <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={onPageChange} />
              </div>
            ) : null}
          </div>
          <div className="flex justify-end xs:justify-center sm:justify-center">
            {authority?.includes('WRITE') ? <WriteButton onClick={onWriteClick} /> : null}
          </div>
        </div>
      </div>
      <div className="flex justify-center xs:mt-[17px] sm:mt-[17px] md:mt-[42px] lg:hidden xl:hidden xxl:hidden">
        <Search />
      </div>
    </div>
  );
}
