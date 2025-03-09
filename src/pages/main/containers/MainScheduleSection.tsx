import { useVeritasDay } from '../hook/useVeritas';

export function MainScheduleSection({ id }: { id: string }) {
  const targetDate = '2025-03-04T00:00:00+09:00';
  const day = useVeritasDay(targetDate);

  const formattedDay = day >= 0 ? `D-${day}` : `D+${Math.abs(day)}`;

  return (
    <div id={id} className="h-[90px] w-full bg-primary text-primary-foreground xs:h-[71px] sm:h-[71px]">
      <div
        className="flex h-full items-center justify-center text-center 
        xs:mx-[50px] xs:justify-between  
        sm:mx-[50px] sm:justify-between 
        md:gap-[20px] 
        lg:gap-[20px] 
        xl:gap-[20px] 
        xxl:gap-[20px]"
      >
        <div
          className="flex items-center justify-center rounded bg-background font-bold text-primary 
          sm:h-[33px] sm:w-[87px] sm:text-xl 
          md:h-[48px] md:w-[130px] md:text-2xl
          lg:h-[48px] lg:w-[130px] lg:text-2xl
          xl:h-[48px] xl:w-[130px] xl:text-2xl
          xxl:h-[48px] xxl:w-[130px] xxl:text-2xl"
        >
          개강
        </div>
        <h1
          className="font-bold leading-none 
          xs:text-2xl 
          sm:text-2xl 
          md:text-4xl 
          lg:text-4xl 
          xl:text-4xl 
          xxl:text-4xl"
        >
          {formattedDay}
        </h1>
      </div>
    </div>
  );
}
