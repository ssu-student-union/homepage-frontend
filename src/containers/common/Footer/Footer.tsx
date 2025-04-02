import { EnvelopeSimple } from '@phosphor-icons/react';

export const Footer = () => {
  return (
    <footer className="flex h-fit w-full flex-col gap-[5px] bg-primary py-[21px] text-white max-sm:items-center max-sm:justify-center md:gap-[19px] md:px-[60px] md:py-[34.5px] lg:gap-[27px] lg:px-[87px] lg:py-[71px]">
      <div className="flex flex-col gap-[10px] text-center md:text-inherit">
        <p className="text-[13px] font-semibold md:text-[24px]">제65대 숭실대학교 총학생회 S:SURE</p>
        <p className="text-[12px] md:text-base">서울시 동작구 상도로 369 숭실대학교 학생회관 106호 총학생회실</p>
      </div>
      <div className="flex items-center gap-[8px]">
        <EnvelopeSimple size={23} />
        <a href="mailto:ssu65th@gmail.com" className="text-[13px] hover:underline md:text-base">
          ssu65th@gmail.com
        </a>
      </div>
      <div className="flex items-center gap-[1px] text-[13px] md:text-base">
        <a href="/personal-data?category=personal">개인정보처리방침</a>
        <span className="w-[18px] text-center">|</span>
        <a href="/personal-data?category=tos">이용약관</a>
        <span className="w-[18px] text-center">|</span>
        <a href="/personal-data?category=email">이메일무단수집거부</a>
      </div>
    </footer>
  );
};
