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
    <div
      className={cn(`px-[200px] pb-[80px] pt-[60px] xs:px-[30px] xs:pt-[40px] sm:px-[30px] md:px-[60px]`, className)}
    >
      <RenderImage category={category!} subCategory={subCategory!} />
    </div>
  );
}
