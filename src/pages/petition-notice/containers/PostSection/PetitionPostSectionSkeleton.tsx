import { Skeleton } from '@/components/ui/skeleton';
import { SkeletonSearch } from '../PopularSection/HeadSection/PetitionNoticeHeadSectionSkeleton';

export function PetitionPostSectionSkeleton() {
  return (
    <div className="mb-20 px-10 xl:px-[200px]">
      <div className="mb-12 flex space-x-10 space-y-3 overflow-hidden">
        <Skeleton className="h-10 w-[69px] flex-shrink-0 rounded-[32px] bg-primary" />
        {[...Array(4)].map((_, index) => (
          <Skeleton key={index} className="h-[15.75px] w-[63px] flex-shrink-0 rounded-[42.5px]" />
        ))}
      </div>
      <div className="flex flex-col space-y-14">
        {[...Array(9)].map((_, index) => (
          <SkeletonPost key={index} />
        ))}
      </div>
      <div className="mt-20 flex justify-center md:justify-end">
        <Skeleton className="h-[42px] w-[123px]" />
      </div>
      <div className="flex justify-center">
        <SkeletonPagination />
      </div>
      <div className="mt-10 flex justify-center lg:hidden">
        <SkeletonSearch />
      </div>
    </div>
  );
}

export function SkeletonPost() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-between md:flex-row">
        <div className="flex space-x-10">
          <Skeleton className="h-[15.75px] w-[60px]" />
          <Skeleton className="h-[15.75px] w-[467px]" />
        </div>
        <div className="mt-8 space-y-3 lg:mt-0">
          <div className="flex justify-end md:block">
            <Skeleton className="h-[15.75px] w-[98px]" />
          </div>
          <div className="flex items-center justify-end space-x-0 sm:space-x-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-3 w-10 rounded-[17.5px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonPagination() {
  return (
    <div className="flex items-center space-x-7">
      <Skeleton className="h-3 w-3 rounded-full" />
      <div className="flex items-center space-x-4">
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-4 rounded-full" />
      </div>
      <Skeleton className="h-3 w-3 rounded-full" />
    </div>
  );
}
