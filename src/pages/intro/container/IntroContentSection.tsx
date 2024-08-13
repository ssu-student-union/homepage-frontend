import { RenderIntro, RenderOrg } from './component/RenderImage';

interface ContentProps {
  category?: string;
  subCategory?: string;
}

export default function IntroContentSection({ category, subCategory }: ContentProps) {
  return (
    <div className="px-[120px] pb-[80px] pt-[80px] xs:px-[30px] xs:pt-[40px] sm:px-[60px]">
      {/*sub-category 값에 따라 소개 또는 조직도를 보여줍니다.*/}
      {subCategory == 'intro' && <RenderIntro category={category!} />}
      {subCategory == 'org' && <RenderOrg category={category!} />}
    </div>
  );
}
