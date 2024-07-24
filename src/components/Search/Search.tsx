import { useResize } from "@/hooks/useResize";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useRef } from "react";

export function Search() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { width } = useResize();

  useEffect(() => {
    if (inputRef.current) {
      if (width > 1440 || (width > 390 && width <= 720)) {
        inputRef.current.placeholder = "원하시는 키워드를 입력하세요";
      } else {
        inputRef.current.placeholder = "키워드 입력";
      }
    }
  }, [width]);

  // 반응형 작업은 임의로 해둔 상태 tailwind.config.js 변동사항 적용 시 수정 예정
  return (
    <div className="flex gap-2">
      <Input
        ref={inputRef}
        type="text"
        className="w-[211px] h-[46px] border-[#959595] placeholder:text-[#B6B6B6] text-base 
                   min-[1441px]:w-[488px] min-[1441px]:h-[58px] 
                   min-[721px]:w-[254px] min-[721px]:h-[58px] 
                   min-[391px]:w-[488px] min-[391px]:h-[58px]"
        placeholder="원하시는 키워드를 입력하세요"
      />
      <Button
        className="w-[77px] h-[46px] text-base 
                   min-[1441px]:w-[94px] min-[1441px]:h-[58px] 
                   min-[721px]:w-[94px] min-[721px]:h-[58px] 
                   min-[391px]:w-[94px] min-[391px]:h-[58px]"
      >
        검색
      </Button>
    </div>
  );
}
