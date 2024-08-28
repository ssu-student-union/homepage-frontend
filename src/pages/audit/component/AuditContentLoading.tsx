import { Skeleton } from '@/components/ui/skeleton';

export default function AuditContentLoading(screenW: number) {
  const emptyFive = Array(5).fill(null);
  const emptyThree = Array(3).fill(null);
  const emptyTwo = Array(2).fill(null);
  if (screenW >= 1920) {
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
  } else if (screenW >= 1440 && screenW < 1920) {
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
