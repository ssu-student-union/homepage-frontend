import { BoardHead } from '@/components/Board/BoardHead';
import { Search } from '@/components/Search/Search';
import { HeadLayoutProps } from '@/types/layout';

export function HeadLayout({ title, subtitle }: HeadLayoutProps) {
  return (
    <div className="mt-[152px] flex justify-between border-b border-b-[#E7E7E7] px-[200px] pb-9 xs:px-10 sm:px-10 md:px-10 lg:px-10">
      <BoardHead title={title} subtitle={subtitle} />
      <div className="xs:hidden sm:hidden md:hidden">
        <Search />
      </div>
    </div>
  );
}
