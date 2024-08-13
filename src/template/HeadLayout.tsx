import { BoardHead } from '@/components/Board/BoardHead';
import { Search } from '@/components/Search/Search';
import { HeadLayoutProps } from '@/types/layout';
import { cn } from '@/libs/utils'; // 필요한 경우 유틸리티 함수 사용

export function HeadLayout({ title, subtitle, borderOff = false }: HeadLayoutProps) {
  return (
    <div
      className={cn(
        'mt-[152px] flex justify-between px-[200px] pb-9 xs:px-10 sm:px-10 md:px-10 lg:px-10',
        borderOff ? '' : 'border-b border-b-[#E7E7E7]'
      )}
    >
      <BoardHead title={title} subtitle={subtitle} />
      <div className="xs:hidden sm:hidden md:hidden">
        <Search />
      </div>
    </div>
  );
}
