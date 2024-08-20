import { BoardHead } from '@/components/Board/BoardHead';
import { Search } from '@/components/Search/Search';
import { HeadLayoutProps } from '@/types/layout';
import { cn } from '@/libs/utils';

export function HeadLayout({ title, subtitle, borderOff = false, className = '', searchHidden = '' }: HeadLayoutProps) {
  return (
    <div
      className={cn(
        'mt-[120px] flex justify-between px-[200px] pb-9 xs:px-10 sm:px-10 md:px-10 lg:px-10',
        className,
        borderOff ? '' : 'border-b border-b-[#E7E7E7]'
      )}
    >
      <BoardHead title={title} subtitle={subtitle} />
      <div className={cn(`xs:hidden sm:hidden md:hidden`, searchHidden)}>
        <Search />
      </div>
    </div>
  );
}
