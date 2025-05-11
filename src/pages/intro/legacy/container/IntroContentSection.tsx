import { cn } from '@/libs/utils';
import { RenderImage } from './component/RenderImage';

interface ContentProps {
  category?: string;
  subCategory?: string;
  className?: string;
}

export default function IntroContentSection({
  category = 'president',
  subCategory = 'intro',
  className,
}: ContentProps) {
  return (
    <div className={cn(`px-[30px] pb-[80px] pt-[40px] sm:pt-[60px] md:px-[60px] lg:px-[200px]`, className)}>
      <RenderImage category={category!} subCategory={subCategory!} />
    </div>
  );
}
