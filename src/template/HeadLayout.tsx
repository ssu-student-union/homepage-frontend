import { BoardHead } from '@/components/Board/BoardHead';
import { Search } from '@/components/Search/Search';
import { HeadLayoutProps } from '@/types/layout';
import { cn } from '@/libs/utils';

export function HeadLayout({
  title,
  subtitle = '',
  borderOff = false,
  className = '',
  searchHidden = false,
}: HeadLayoutProps) {
  return (
    <div
      className={cn(
        'mt-[120px] flex justify-between px-10 pb-9 xl:px-[200px]',
        className,
        borderOff ? '' : 'border-b border-b-[#E7E7E7]'
      )}
    >
      <BoardHead title={title} subtitle={subtitle} />
      {searchHidden ? (
        <></>
      ) : (
        <div className={cn(`hidden lg:block`)}>
          <Search />
        </div>
      )}
    </div>
  );
}
