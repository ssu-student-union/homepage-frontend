import { Card, CardContent } from '@/components/ui/card';
import { cn } from './../libs/utils';
import SsureLogo from '@/components/logo/SsureLogo';

// 소개페이지 소개글에 쓰이는 컴포넌트입니다. tailwindcss border는 그라데이션이 적용되지않아 이렇게 구현했는데, 더 좋은 방법 있으면 말씀해주세요.
interface IntroCardProps {
  children: React.ReactNode;
  className?: string;
}
export function IntroCard({ children, className = '' }: IntroCardProps) {
  return (
    <div className={cn('rounded-[1.25rem] bg-gradient-to-b from-[#9ABAFF] to-[#6F84FF] p-0.5', className)}>
      <Card
        className={cn(
          'whitespace-pre-wrap rounded-[1.25rem] bg-white px-10 pt-12 text-center text-base font-semibold leading-relaxed text-[#2F377C]'
        )}
      >
        <CardContent
          className={cn(
            'flex flex-col items-center whitespace-pre-wrap p-0 text-center text-base font-semibold leading-relaxed text-[#2F377C]'
          )}
        >
          {children}
          <SsureLogo.Navy className="w-40" />
        </CardContent>
      </Card>
    </div>
  );
}
