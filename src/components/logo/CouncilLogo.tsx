import LogoSvg from '@/assets/image/logo/focussu_logo.svg?react';
// import SkyBlueLogoSvg from '@/assets/image/logo/focussu_logo_skyblue.svg?react';
import { cn } from '@/libs/utils';

// 65대 학생회 S:SURE 로고입니다.
export default function CouncilLogo({ className }: React.SVGProps<SVGSVGElement>) {
  return <LogoSvg className={cn(className)} />;
}

// 65대 학생회 S:SURE 로고 다크 버전입니다.
// CouncilLogo.Dark = ({ className }: React.SVGProps<SVGSVGElement>) => {
//   return <SkyBlueLogoSvg className={cn(className)} />;
// };
