import { useRef } from 'react';
import { Input } from './ui/input';
import searchIcon from '@/assets/image/serach.svg';

interface IntegratedSearchProps {
  className?: string;
  onSearch?: (value: string) => void;
}

export default function IntegratedSearch({ className, onSearch }: IntegratedSearchProps) {
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
    <div className={`relative flex ${className}`}>
      <Input
        ref={searchRef}
        type="text"
        className="h-auto border border-white bg-primary pr-10 text-base text-white placeholder:text-white/70 focus:border-white"
        placeholder="원하시는 키워드를 입력하세요"
        onKeyDown={handleKeyPress}
      />
      <img
        src={searchIcon}
        alt="Search"
        className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer"
        onClick={handleSearch}
        width={16}
        height={16}
      />
    </div>
  );
}
