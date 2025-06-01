import { Skeleton } from '@/components/ui/skeleton';

export default function UserContainerSkeleton() {
  return (
    <div className="xs:mx-[20%] xs:flex-col xs:pb-4 mx-auto mb-10 mt-16 flex flex-row items-center rounded-2xl border-2 border-[#D9D9D9] bg-white px-10 py-8 sm:mx-[22%] sm:flex-col md:mx-10 md:py-6 lg:mx-10 xl:mx-10 xxl:mx-10">
      <div className="flex gap-4">
        <Skeleton className="size-24 rounded-full" />
        <div className="flex-col space-y-2 pt-3">
          <Skeleton className="h-5 w-60" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
    </div>
  );
}
