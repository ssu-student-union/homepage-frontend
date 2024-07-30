import { Logo } from "@/components/Logo/Logo";
import { EnvelopeSimple } from "@phosphor-icons/react";

export const Footer = () => {
  return (
    <footer className="flex flex-col xxl:gap-[27px] xl:gap-[27px] lg:gap-[27px] md:gap-[19px] sm:gap-[5px] sm:items-center w-full bg-primary text-white h-fit xxl:px-[87px] xxl:py-[71px] xl:px-[87px] xl:py-[71px] lg:px-[87px] lg:py-[71px] md:px-[60px] md:py-[34.5px] sm:px-[34px] sm:py-[21px]">
      <div className="xxl:w-[103px] xl:w-[103px] lg:size-[103px] md:size-[64px] sm:size-[28px]">
        <Logo size={"100%"} />
      </div>
      <div className="flex flex-col gap-[10px] sm:text-center">
        <strong>
          <p>제64대 숭실대학교 총학생회 US:SUM</p>
        </strong>
        <p>서울시 동작구 상도로 369 숭실대학교 학생회관 106호 총학생회실</p>
      </div>
      <div className="flex gap-[8px] items-center">
        <EnvelopeSimple size={23} />
        <p>ussum64@gmail.com</p>
      </div>
      <div className="flex gap-[1px] items-center">
        <a href="#">개인정보처리방침</a>
        <span className="w-[18px] text-center">|</span>
        <a href="#">이용약관</a>
        <span className="w-[18px] text-center">|</span>
        <a href="#">이메일무단수집거부</a>
      </div>
    </footer>
  );
};
