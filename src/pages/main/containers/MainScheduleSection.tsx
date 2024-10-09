import { useVeritasDay } from '../hook/useVeritas';

export function MainScheduleSection() {
  const targetDate = '2024-12-21T00:00:00+09:00';
  const daysLeft = useVeritasDay(targetDate);

  return (
    <div className="h-[180px] w-full bg-primary text-primary-foreground">
      <div className="flex h-full items-center justify-center text-center xs:gap-[1rem] sm:flex-row sm:gap-[1rem] md:flex-row md:gap-[1rem] lg:flex-col lg:gap-[7px] xl:flex-col xl:gap-[7px] xxl:flex-col xxl:gap-[7px]">
        <div className="rounded bg-background px-[2rem] py-1 font-semibold text-primary sm:text-xl md:text-xl lg:text-2xl xl:text-2xl xxl:text-2xl">
          종강
        </div>
        <h1 className="font-bold leading-none sm:text-2xl md:text-3xl lg:text-6xl xl:text-6xl xxl:text-6xl">
          {`D-${daysLeft}`}
        </h1>
      </div>
    </div>
  );
}
