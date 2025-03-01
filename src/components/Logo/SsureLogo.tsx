import LogoSvg from '@/assets/image/logo/ssure_logo.svg?react';
import DarkLogoSvg from '@/assets/image/logo/ssure_logo_dark.svg?react';
import { cn } from '@/libs/utils';

// 65대 학생회 S:SURE 로고입니다.
export default function SsureLogo({ className }: React.SVGProps<SVGSVGElement>) {
  return <LogoSvg className={cn(className)} />;
}

// 65대 학생회 S:SURE 로고 다크 버전입니다.
SsureLogo.Dark = ({ className }: React.SVGProps<SVGSVGElement>) => {
  return <DarkLogoSvg className={cn(className)} />;
};
