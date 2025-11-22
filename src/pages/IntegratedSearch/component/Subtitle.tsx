interface SubtitleProps {
  title: string;
  count: number;
}

export function Subtitle({ title, count }: SubtitleProps) { 
  return(
    <div className='flex gap-4 items-center'>
      <div className='text-2xl font-bold'>{title}</div>
      <span className='text-[18px] text-[#2F4BF7] font-semibold'>총 {count}건</span>
    </div>
  )
}