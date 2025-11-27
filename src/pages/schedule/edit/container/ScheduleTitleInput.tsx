import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { cn } from '@/libs/utils';

interface ScheduleTitleInputProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

export function ScheduleTitleInput({ value, onChange, maxLength = 50 }: ScheduleTitleInputProps) {
  const [error, setError] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (newValue.length <= maxLength) {
      onChange(newValue);
      if (newValue.length === maxLength) {
        setError(`제목은 ${maxLength}자 이내이어야 합니다.`);
      } else {
        setError('');
      }
    }
  };

  return (
    <div className="flex-1">
      <div className="relative">
        <Input
          id="title"
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="일정 제목을 입력하세요"
          maxLength={maxLength}
          className="h-[3.75rem] w-full rounded-[6px] border-2 border-gray-300 pr-16 text-[18px] font-medium placeholder:font-medium placeholder:text-gray-400"
        />
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
          {value.length}/{maxLength}
        </span>
      </div>
      <div className="mt-1 h-5">
        <p
          className={cn(
            'text-sm text-red-500 transition-all',
            error ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
          )}
        >
          {error}
        </p>
      </div>
    </div>
  );
}

