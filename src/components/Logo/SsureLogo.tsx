import LogoSvg from '@/assets/image/logo/ssure_logo.svg?react';
import { cn } from '@/libs/utils';

export default function SsureLogo({ className }: React.SVGProps<SVGSVGElement>) {
  return <LogoSvg className={cn(className)} />;
}
