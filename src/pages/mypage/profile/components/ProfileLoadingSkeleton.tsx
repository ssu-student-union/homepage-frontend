import { Skeleton } from '@/components/ui/skeleton';

export default function ProfileLoadingSkeleton() {
  return (
    <div className="xs:items-center flex flex-col items-start pl-20 sm:items-center">
      <div className="my-4 mr-16 p-4">
        <div className="flex gap-4">
          <div className="flex-col space-y-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-20" />
          </div>
          <div className="flex-col space-y-2">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-5 w-48" />
          </div>
        </div>
      </div>
    </div>
  );
}
