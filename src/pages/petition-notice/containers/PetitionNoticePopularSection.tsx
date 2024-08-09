export function PetitionNoticePopularSection() {
  return (
    <div className="mt-[70px] overflow-x-hidden pl-[200px] text-[28px] font-bold xs:pl-10 sm:pl-10 md:pl-10 lg:pl-10">
      <p className="mb-[11px]">인기청원</p>

      <div className="scrollbar-hide flex gap-6 overflow-scroll">
        <div className="h-[237px] w-[362px] flex-shrink-0 bg-primary"></div>
        <div className="h-[237px] w-[362px] flex-shrink-0 bg-primary/80"></div>
        <div className="h-[237px] w-[362px] flex-shrink-0 bg-primary/60"></div>
        <div className="h-[237px] w-[362px] flex-shrink-0 bg-primary/40 "></div>
      </div>
    </div>
  );
}
