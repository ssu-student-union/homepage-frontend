import { Skeleton } from '@/components/ui/skeleton';

interface AuditContentLoadingProps {
  screenWidth: number;
}

export default function AuditContentLoading({ screenWidth }: AuditContentLoadingProps) {
  const emptyFive = Array(5).fill(null);
  const emptyThree = Array(3).fill(null);
  const emptyTwo = Array(2).fill(null);
  if (screenWidth >= 1920) {
    return (
      <div className="flex flex-col justify-between">
        {emptyThree.map((_, index) => (
          <div key={index} className="flex flex-row justify-between pb-[30px]">
            {emptyThree.map((_, i) => (
              <Skeleton key={i} className="h-[209px] min-w-[400px] px-[16px] py-[16px]" />
            ))}
          </div>
        ))}
      </div>
    );
  } else if (screenWidth >= 1440 && screenWidth < 1920) {
    return (
      <div className="flex flex-col justify-between">
        {emptyThree.map((_, index) => (
          <div key={index} className="flex flex-row justify-between pb-[30px]">
            {emptyTwo.map((_, i) => (
              <Skeleton key={i} className="h-[209px] min-w-[400px] px-[16px] py-[16px]" />
            ))}
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-between">
        {emptyFive.map((_, index) => (
          <Skeleton key={index} className="h-[10.69rem] w-full px-5 py-[1.44rem]" />
        ))}
      </div>
    );
  }
}
