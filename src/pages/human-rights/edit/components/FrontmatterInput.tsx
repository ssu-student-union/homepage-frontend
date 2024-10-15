import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/libs/utils.ts';

// TODO: 기존 Input 디자인과 상이하여 새로운 컴포넌트인 `FrontmatterInput` 생성, 추후 디자인팀과 논의하여 다른 페이지의 폼과 동일한 형태가 되도록 리팩토링 필요
const FrontmatterInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return <input className={cn('w-fit rounded-md border-2 border-[#CDCDCD]', className)} ref={ref} {...props} />;
  }
);

export { FrontmatterInput };
