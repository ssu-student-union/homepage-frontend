import { useResize } from '@/hooks/useResize';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useEffect, useRef } from 'react';

export function Search() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { width } = useResize();

  useEffect(() => {
    if (inputRef.current) {
      if (width > 1439 || (width > 719 && width <= 1079)) {
        inputRef.current.placeholder = '원하시는 키워드를 입력하세요';
      } else {
        inputRef.current.placeholder = '키워드 입력';
      }
    }
  }, [width]);

  return (
    <div className="flex gap-2">
      <Input
        ref={inputRef}
        type="text"
        className="
        border-[#959595] text-base placeholder:text-[#B6B6B6] xs:h-[42px] xs:w-[211px] sm:h-[42px] sm:w-[211px] md:h-[58px] md:w-[488px] lg:h-[58px] lg:w-[254px] xl:h-[58px] xl:w-[488px] xxl:h-[58px] xxl:w-[488px]"
        placeholder="원하시는 키워드를 입력하세요"
      />
      <Button className="text-base xs:h-[46px] xs:w-[77px] sm:h-[46px] sm:w-[77px] md:h-[58px] md:w-[94px] lg:h-[58px] lg:w-[94px] xl:h-[58px] xl:w-[94px] xxl:h-[58px] xxl:w-[94px]">
        검색
      </Button>
    </div>
  );
}
