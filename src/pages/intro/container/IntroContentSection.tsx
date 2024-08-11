interface ContentProps {
  category?: string;
  subCategory: string;
}

export default function IntroContentSection({ subCategory }: ContentProps) {
  return (
    <div className="px-[120px] pt-[40px] xs:px-[30px] xs:pt-[0px] sm:px-[60px]">
      {subCategory == 'intro' && <RenderIntro />}
      {subCategory == 'org' && <RenderOrg />}
    </div>
  );
}

function RenderIntro() {
  return <div></div>;
}

function RenderOrg() {
  return <div></div>;
}
