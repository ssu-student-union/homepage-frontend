import { cn } from '@/libs/utils';
import { ReactNode } from 'react';

interface FloatingButtonProps {
  href?: string;
  children: ReactNode;
  className?: string;
  bgColor?: string;
  isChannelTalk?: boolean;
}

export default function FloatingButton({
  href,
  children,
  className = '',
  bgColor = 'bg-primary',
  isChannelTalk = false,
}: FloatingButtonProps) {
  const commonClass = `flex items-center justify-center rounded-full cursor-pointer ${bgColor} h-[62px] w-[62px] hover:bg-blue-700 md:h-20 md:w-20 ${className}`;

  if (isChannelTalk) {
    return <button className={cn('custom-button-1', commonClass)}>{children}</button>;
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={commonClass}>
      {children}
    </a>
  );
}
