interface SubtitleProps {
  title: string;
  count: number;
}

export function Subtitle({ title, count }: SubtitleProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="text-2xl font-bold">{title}</div>
      <span className="text-[18px] font-semibold text-[#2F4BF7]">총 {count}건</span>
    </div>
  );
}
