import { BoardHead } from '@/components/Board/BoardHead';
import { Search } from '@/components/Search';

export function PetitionNoticeHeadSection() {
  return (
    <div className="mt-[152px] flex justify-between border-b border-b-[#E7E7E7] px-[200px] pb-9 xs:px-10 sm:px-10 md:px-10 lg:px-10">
      <BoardHead
        title="학생청원게시판"
        subtitle={
          <>
            100인 이상의 동의를 받으면,{' '}
            <span className="xs:block sm:block">
              <span className="text-primary">중앙운영위원회의 안건</span>으로 상정됩니다.
            </span>
          </>
        }
      />
      <div className="xs:hidden sm:hidden md:hidden">
        <Search />
      </div>
    </div>
  );
}
