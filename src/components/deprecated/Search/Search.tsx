import { useResize } from '@/hooks/useResize';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { useEffect, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { SearchState } from '@/recoil/atoms/atom';

/**
 * @deprecated 이 컴포넌트는 recoilState와 강결합 되어 있습니다. 대신 `components/Search`를 사용하세요.
 */
export function Search() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { width } = useResize();
  const setSearchInput = useSetRecoilState(SearchState);

  useEffect(() => {
    if (inputRef.current) {
      if (width > 1439 || (width > 719 && width <= 1079)) {
        inputRef.current.placeholder = '원하시는 키워드를 입력하세요';
      } else {
        inputRef.current.placeholder = '키워드 입력';
      }
    }
  }, [width]);

  const handleSearch = () => {
    if (inputRef.current) {
      setSearchInput(inputRef.current.value);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        ref={inputRef}
        type="text"
        className="h-[42px] w-[211px] border-[#959595] text-base placeholder:text-[#B6B6B6] md:h-[58px] md:w-[488px]"
        placeholder="원하시는 키워드를 입력하세요"
        onKeyDown={handleKeyPress}
      />
      <Button onClick={handleSearch} className="h-[46px] w-[77px] text-base md:h-[58px] md:w-[94px]">
        검색
      </Button>
    </div>
  );
}
