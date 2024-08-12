interface ContentProps {
  category?: string;
  subCategory?: string;
}

export default function IntroContentSection({ category, subCategory }: ContentProps) {
  return (
    <div className="px-[120px] pt-[40px] pb-[80px] xs:px-[30px] xs:pt-[0px] sm:px-[60px]">
      {/*sub-category 값에 따라 소개 또는 조직도를 보여줍니다.*/}
      {subCategory == 'intro' && <RenderIntro category={category!} />}
      {subCategory == 'org' && <RenderOrg category={category!}/>}
    </div>
  );
}

interface RenderIntroProps{
  category : string;
}

function RenderIntro({category}:RenderIntroProps) {
  switch (category) {
    case 'president':
      return (<img src = "https://picsum.photos/id/221/1800/1200" className="w-full h-auto"/>);
    case 'central_executive_committee':
      return (<img src = "https://picsum.photos/id/222/1800/1200" className="w-full h-auto"/>);;
    case 'central_operating_committee':
      return (<img src = "https://picsum.photos/id/223/1800/1200" className="w-full h-auto"/>);;
    default:
      return '쿼리가 잘못되었습니다.';
  }
}

interface RenderOrgProps{
  category : string;
}

function RenderOrg({category}:RenderOrgProps) {
  switch (category) {
    case 'president':
      return (<img src = "https://picsum.photos/id/228/1800/1200" className="w-full h-auto"/>);
    case 'central_executive_committee':
      return (<img src = "https://picsum.photos/id/225/1800/1200" className="w-full h-auto"/>);;
    case 'central_operating_committee':
      return (<img src = "https://picsum.photos/id/230/1800/1200" className="w-full h-auto"/>);;
    default:
      return '쿼리가 잘못되었습니다.';
  }
}