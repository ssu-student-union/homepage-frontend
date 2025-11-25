type ScheduleDetailCardProps = {
  category: string;
  title: string;
  dateRange: string;
};

export function ScheduleDetailCard({ category, title, dateRange }: ScheduleDetailCardProps) {
  return (
    <div className="flex h-[5.5rem] w-full shrink-0 flex-col items-start justify-center gap-[0.25px] rounded-[0.625rem] border border-black bg-white px-4 py-3">
      <p className="text-sm text-gray-900">{category}</p>
      <p className="text-lg font-bold text-gray-900">{title}</p>
      <p className="text-sm font-normal text-gray-500">{dateRange}</p>
    </div>
  );
}
