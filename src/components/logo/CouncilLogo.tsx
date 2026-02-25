import LogoSvg from '@/assets/image/logo/focussu_logo.svg?react';
import SkyBlueLogoSvg from '@/assets/image/logo/focussu_logo_skyblue.svg?react';
import { cn } from '@/libs/utils';

// 66대 학생회 FOCUSSU 로고입니다.
export default function CouncilLogo({ className }: React.SVGProps<SVGSVGElement>) {
  return <LogoSvg className={cn(className)} />;
}

// 66대 학생회 FOCUSSU 로고 하늘색 버전입니다.

CouncilLogo.Skyblue = ({ className }: React.SVGProps<SVGSVGElement>) => {
  return <SkyBlueLogoSvg className={cn(className)} />;
};
