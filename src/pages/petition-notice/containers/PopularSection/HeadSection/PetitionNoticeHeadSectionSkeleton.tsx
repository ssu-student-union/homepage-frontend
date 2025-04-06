import { Skeleton } from '@/components/ui/skeleton';

export function PetitionNoticeHeadSectionSkeleton() {
  return (
    <div className="mt-16 flex justify-between border-b-2 px-10 pb-9 xl:px-[200px]">
      <div className="flex flex-col space-y-[22.25px]">
        <Skeleton className="h-[29.75px] w-[206px] rounded-[42.5px]" />
        <div className="space-y-2">
          <Skeleton className="h-[14px] w-[429px] rounded-[20px]" />
        </div>
      </div>
      <div className="hidden lg:block">
        <SkeletonSearch />
      </div>
    </div>
  );
}

export function SkeletonSearch() {
  return (
    <div className="flex items-center justify-between gap-32 sm:gap-24 md:gap-72">
      <Skeleton className="h-[14px] w-[73px] rounded-[20px] sm:h-[14px] sm:w-[188px]" />
      <Skeleton className="h-[46px] w-[77px] bg-primary sm:h-[58px] sm:w-[94px]" />
    </div>
  );
}
