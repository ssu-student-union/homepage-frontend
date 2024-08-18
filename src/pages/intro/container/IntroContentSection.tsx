import { cn } from '@/libs/utils';
import { RenderIntro, RenderOrg } from './component/RenderImage';

interface ContentProps {
  category?: string;
  subCategory?: string;
  className?: string;
}

export default function IntroContentSection({ category, subCategory, className }: ContentProps) {
  return (
    <div
      className={cn(`px-[120px] pb-[80px] pt-[60px] xs:px-[30px] xs:pt-[40px] sm:px-[30px] md:px-[60px]`, className)}
    >
      {/*sub-category 값에 따라 소개 또는 조직도를 보여줍니다.*/}
      {subCategory == 'intro' && <RenderIntro category={category!} />}
      {subCategory == 'org' && <RenderOrg category={category!} />}
    </div>
  );
}
