import { BoardHead } from "@/components/Board/BoardHead";
import { Search } from "@/components/Search/Search";

export function PetitionNoticeHeadSection() {
  return (
    <div className="flex justify-between mt-[152px] px-[200px] lg:px-10 md:px-10 sm:px-10 xs:px-10 border-b border-b-[#E7E7E7] pb-9">
      <BoardHead
        title="학생청원게시판"
        subtitle={
          <>
            100인 이상의 동의를 받으면,{" "}
            <span className="text-primary">중앙운영위원회의 안건</span>으로
            상정됩니다.
          </>
        }
      />
      <div className="md:hidden sm:hidden xs:hidden">
        <Search />
      </div>
    </div>
  );
}
