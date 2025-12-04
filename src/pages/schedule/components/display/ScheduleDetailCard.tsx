import { cn } from '@/libs/utils';

type ScheduleDetailCardProps = {
  calenderId: number;
  category: string;
  title: string;
  dateRange: string;
  isSelected?: boolean;
  isHovered?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
};

export function ScheduleDetailCard({
  category,
  title,
  dateRange,
  isSelected = false,
  isHovered = false,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: ScheduleDetailCardProps) {
  return (
    <div
      className={cn(
        'relative z-10 flex min-h-[2.5rem] min-w-full shrink-0 cursor-pointer flex-col items-start justify-center gap-[0.25px] rounded-[0.625rem] border border-black bg-white px-3 py-1 transition-colors md:w-full',
        isSelected && 'border-gray-400 bg-gray-100',
        isHovered && !isSelected && 'border-gray-300 bg-gray-50'
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <p className="text-[10px] text-gray-900 md:text-sm xl:text-base">{category}</p>
      <p className="text-xs font-bold text-gray-900 md:text-base xl:text-lg">{title}</p>
      <p className="text-[10px] font-normal text-gray-500 md:text-sm xl:text-base">{dateRange}</p>
    </div>
  );
}
