import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonComment() {
  return (
    <div className="mb-6">
      <Skeleton className="h-32 w-full bg-gray-50" />
    </div>
  );
}
