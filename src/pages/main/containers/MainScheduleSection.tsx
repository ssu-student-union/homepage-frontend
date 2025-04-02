import { cn } from '@/libs/utils';
import { useVeritasDay } from '../hook/useVeritas';

export function MainScheduleSection({ id, className }: { id: string; className?: string }) {
  const targetDate = '2025-03-04T00:00:00+09:00';
  const day = useVeritasDay(targetDate);

  const formattedDay = day >= 0 ? `D-${day}` : `D+${Math.abs(day)}`;

  return (
    <div id={id} className={cn('h-[71px] w-full bg-primary text-primary-foreground md:h-[90px]', className)}>
      <div className="mx-[50px] flex h-full items-center justify-between text-center md:justify-center md:gap-[20px]">
        <div className="flex items-center justify-center rounded bg-background font-bold text-primary sm:h-[33px] sm:w-[87px] sm:text-xl md:h-[48px] md:w-[130px] md:text-2xl">
          개강
        </div>
        <h1 className="text-2xl font-bold leading-none md:text-4xl">{formattedDay}</h1>
      </div>
    </div>
  );
}
