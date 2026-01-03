import { EnvelopeSimple } from '@phosphor-icons/react';
import { STUDENT_COUNCIL_EMAIL, STUDENT_COUNCIL_NAME } from '@/const/studentCouncil';

export const Footer = () => {
  return (
    <footer className="flex flex-col gap-4 bg-primary px-8 py-5 text-primary-foreground md:gap-5 md:px-10 md:py-8">
      <div className="flex flex-col gap-1 text-center md:gap-2 md:text-start">
        <p className="text-lg font-semibold md:text-2xl">제66대 숭실대학교 총학생회 {STUDENT_COUNCIL_NAME}</p>
        <p className="text-sm md:text-lg">서울시 동작구 상도로 369 숭실대학교 학생회관 106호 총학생회실</p>
      </div>
      <div className="flex items-center justify-center gap-1.5 text-sm md:justify-start md:text-lg">
        <EnvelopeSimple className="size-4 md:size-5" />
        <a href={`mailto:${STUDENT_COUNCIL_EMAIL}`} className="hover:underline">
          {STUDENT_COUNCIL_EMAIL}
        </a>
      </div>
      <div className="flex items-center justify-center text-xs md:justify-start md:text-sm [&>*:not(:last-child)]:after:mx-1.5 [&>*:not(:last-child)]:after:content-['|']">
        <a href="/personal-data?category=personal">개인정보처리방침</a>
        <a href="/personal-data?category=tos">이용약관</a>
        <a href="/personal-data?category=email">이메일무단수집거부</a>
      </div>
    </footer>
  );
};
