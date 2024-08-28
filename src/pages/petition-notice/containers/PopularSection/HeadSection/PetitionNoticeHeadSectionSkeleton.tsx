import { Skeleton } from '@/components/ui/skeleton';

export function PetitionNoticeHeadSectionSkeleton() {
  return (
    <div className="mt-[120px] flex justify-between border-b-2 px-[200px] pb-9 xs:px-10 sm:px-10 md:px-10 lg:px-10">
      <div className="flex flex-col space-y-[22.25px]">
        <Skeleton className="h-[29.75px] w-[206px] rounded-[42.5px]" />
        <div className="space-y-2">
          <Skeleton className="h-[14px] w-[429px] rounded-[20px] " />
        </div>
      </div>
      <div className="xs:hidden sm:hidden md:hidden">
        <SkeletonSearch />
      </div>
    </div>
  );
}

export function SkeletonSearch() {
  return (
    <div className="flex items-center justify-between gap-72 xs:gap-32 sm:gap-24">
      <Skeleton className="h-[14px] w-[188px] rounded-[20px] xs:h-[14px] xs:w-[73px]" />
      <Skeleton className="h-[58px] w-[94px] bg-primary xs:h-[46px] xs:w-[77px]" />
    </div>
  );
}
