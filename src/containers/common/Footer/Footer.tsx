<<<<<<< HEAD
import { EMAIL, STUDENT_COUNCIL_NAME } from '@/const/studentCouncil';
=======
>>>>>>> develop
import { EnvelopeSimple } from '@phosphor-icons/react';

export const Footer = () => {
  return (
<<<<<<< HEAD
    <footer className="flex h-fit w-full flex-col bg-primary text-white xs:items-center xs:justify-center xs:gap-[5px] xs:py-[21px] sm:items-center sm:justify-center sm:gap-[5px] sm:py-[21px] md:gap-[19px] md:px-[60px] md:py-[34.5px] lg:gap-[27px] lg:px-[87px] lg:py-[71px] xl:gap-[27px] xl:px-[87px] xl:py-[71px] xxl:gap-[27px] xxl:px-[87px] xxl:py-[71px]">
      <div className="flex flex-col gap-[10px] xs:text-center sm:text-center">
        <strong>
          <p className="decoration-skip-ink-none text-left text-[24px] font-bold leading-[28.64px] underline-offset-[from-font] xs:text-[13px] sm:text-[13px]">
            제65대 숭실대학교 총학생회 {STUDENT_COUNCIL_NAME}
          </p>
        </strong>
=======
    <footer className="flex h-fit w-full flex-col bg-primary text-white xs:items-center xs:justify-center xs:gap-[5px] xs:py-[21px] sm:items-center sm:items-center sm:items-center sm:justify-center sm:gap-[5px] sm:py-[21px] md:gap-[19px] md:px-[60px] md:py-[34.5px] lg:gap-[27px] lg:px-[87px] lg:py-[71px] xl:gap-[27px] xl:px-[87px] xl:py-[71px] xxl:gap-[27px] xxl:px-[87px] xxl:py-[71px]">
      <div className="flex flex-col gap-[10px] xs:text-center sm:text-center">
        <p className="text-[24px] font-semibold xs:text-[13px] sm:text-[13px]">제65대 숭실대학교 총학생회 S:SURE</p>
>>>>>>> develop
        <p className="xs:text-[12px] sm:text-[12px]">서울시 동작구 상도로 369 숭실대학교 학생회관 106호 총학생회실</p>
      </div>
      <div className="flex items-center gap-[8px]">
        <EnvelopeSimple size={23} />
<<<<<<< HEAD
        <p className="xs:text-[13px] sm:text-[13px]">{EMAIL}</p>
=======
        <a href="mailto:ssu65th@gmail.com" className="hover:underline xs:text-[13px] sm:text-[13px]">
          ssu65th@gmail.com
        </a>
>>>>>>> develop
      </div>
      <div className="flex items-center gap-[1px] xs:text-[13px] sm:text-[13px]">
        <a href="/personal-data?category=personal">개인정보처리방침</a>
        <span className="w-[18px] text-center">|</span>
        <a href="/personal-data?category=tos">이용약관</a>
        <span className="w-[18px] text-center">|</span>
        <a href="/personal-data?category=email">이메일무단수집거부</a>
      </div>
    </footer>
  );
};
