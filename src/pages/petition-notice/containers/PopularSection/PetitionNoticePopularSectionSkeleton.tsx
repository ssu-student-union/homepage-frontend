import { Skeleton } from '@/components/ui/skeleton';

export function PetitionNoticePopularSectionSkeleton() {
  return (
    <div className="mb-[75px] mt-[70px] pl-10 sm:mb-[150px] xl:pl-[200px]">
      <Skeleton className="h-[24.5px] w-[104px] rounded-[35px]" />
      <div className="mt-[54px] flex w-full space-x-14 overflow-hidden ">
        {[...Array(4)].map((_, index) => (
          <span className="flex-shrink-0" key={index}>
            <SkeletonPopular />
          </span>
        ))}
      </div>
    </div>
  );
}

export function SkeletonPopular() {
  return (
    <div className="flex w-[322px] flex-col justify-center">
      <div className="mb-[28.75px]">
        <div className="mb-2 flex items-center space-x-1">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-3 w-10 rounded-[17.5px]" />
        </div>
        <Skeleton className="h-[19.25px] w-[287px] rounded-[27.5px]" />
      </div>
      <div className="mb-[19.25px] space-y-[6.75px]">
        <Skeleton className="h-[15.75px] w-[191px] rounded-[22.5px]" />
        <Skeleton className="h-[15.75px] w-[223px] rounded-[22.5px]" />
        <Skeleton className="h-[15.75px] w-[292px] rounded-[22.5px]" />
      </div>
      <div className="flex justify-between">
        <Skeleton className="h-[14px] w-[85px] rounded-[20px]" />
        <div className="flex items-center space-x-1">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-3 w-10 rounded-[17.5px]" />
        </div>
      </div>
    </div>
  );
}
