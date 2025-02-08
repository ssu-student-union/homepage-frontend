import SsureLogo from '@/assets/image/logo/ssure_white_logo.svg?react';

export function Logo({ className }: { className?: string }) {
  return <SsureLogo className={`h-full w-full ${className}`} />;
}
