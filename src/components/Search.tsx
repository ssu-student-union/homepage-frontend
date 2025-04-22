import { cn } from '@/libs/utils';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useRef } from 'react';

interface SearchProps {
  className?: string;
  onSearch?: (value: string) => void;
}

export function Search({ className, onSearch }: SearchProps) {
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    onSearch?.(searchRef.current?.value || '');
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={cn('flex items-stretch gap-2', className)}>
      <Input
        ref={searchRef}
        type="text"
        className="h-auto grow border-border text-base placeholder:text-[#B6B6B6]"
        placeholder="원하시는 키워드를 입력하세요"
        onKeyDown={handleKeyPress}
      />
      <Button onClick={handleSearch} className="h-14 w-24 text-base">
        검색
      </Button>
    </div>
  );
}
