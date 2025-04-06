import { Skeleton } from '@/components/ui/skeleton';

export default function NoticeDetailLoading() {
  return (
    <div className="px-[20px] md:px-[40px] lg:px-[120px]">
      <Skeleton className="h-8 w-80" />
      <Skeleton className="h-8 w-80" />
      <Skeleton className="h-8 w-80 pb-8" />
      <Skeleton className="size-[50rem]" />
    </div>
  );
}
