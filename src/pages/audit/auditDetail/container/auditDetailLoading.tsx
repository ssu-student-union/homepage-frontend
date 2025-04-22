import { Skeleton } from '@/components/ui/skeleton';

export default function AuditDetailLoading() {
  return (
    <div className="px-[20px] md:px-[40px] lg:px-[120px]">
      <Skeleton className="h-[2rem] w-[20rem]" />
      <Skeleton className="h-[2rem] w-[20rem]" />
      <Skeleton className="h-[2rem] w-[20rem] pb-[2rem]" />
      <Skeleton className="h-[50rem] w-[50rem]" />
    </div>
  );
}
