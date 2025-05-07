import { cn } from '@/libs/utils';
import { ReactNode } from 'react';

// 메인페이지에 쓰이는 FloatingButton 컴포넌트입니다. 기본적으로, children에 아이콘을 넣어서 사용합니다. 채널톡의 경우 특수하기에 isChannelTalk으로 case를 분류해놨습니다.

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
