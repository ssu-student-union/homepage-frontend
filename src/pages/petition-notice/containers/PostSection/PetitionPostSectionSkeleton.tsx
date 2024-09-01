import { Skeleton } from '@/components/ui/skeleton';
import { SkeletonSearch } from '../PopularSection/HeadSection/PetitionNoticeHeadSectionSkeleton';

export function PetitionPostSectionSkeleton() {
  return (
    <div className="mb-20 px-[200px] xs:px-10 sm:px-10 md:px-10 lg:px-10">
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
      <div className="mt-20 flex justify-end xs:justify-center sm:justify-center">
        <Skeleton className="h-[42px] w-[123px]" />
      </div>
      <div className="flex justify-center">
        <SkeletonPagination />
      </div>
      <div className="mt-10 flex justify-center lg:hidden xl:hidden xxl:hidden">
        <SkeletonSearch />
      </div>
    </div>
  );
}

export function SkeletonPost() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between xs:flex-col sm:flex-col">
        <div className="flex space-x-10">
          <Skeleton className="h-[15.75px] w-[60px]" />
          <Skeleton className="h-[15.75px] w-[467px]" />
        </div>
        <div className="space-y-3 xs:mt-8 sm:mt-8 md:mt-8">
          <div className="xs:flex xs:justify-end sm:flex sm:justify-end">
            <Skeleton className="h-[15.75px] w-[98px]" />
          </div>
          <div className="flex items-center justify-end space-x-2 xs:space-x-0">
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
