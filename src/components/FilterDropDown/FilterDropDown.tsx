import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/libs/utils';
import { HTMLAttributes } from 'react';

// 카테고리 선택을 위한 컴포넌트입니다.

interface FilterDropDownProps extends HTMLAttributes<HTMLDivElement> {
  defaultValue?: string; // 디폴트 값
  optionValue: string[]; // 카테고리 목록
  onValueChange: (value: string) => void;
  value?: string;
  mainTextStyle?: string; // main 스타일
  itemStyle?: string; // item 스타일
  isData?: boolean;
}

export function FilterDropDown({
  className,
  defaultValue,
  optionValue,
  onValueChange,
  value,
  itemStyle,
}: FilterDropDownProps) {
  const isSelected = !!value;

  return (
    <Select onValueChange={onValueChange} value={value}>
      <SelectTrigger
        className={cn(`h-[67px] w-[411px] pl-9 ${isSelected ? 'text-gray-800' : 'text-gray-500'}`, className)}
      >
        <SelectValue placeholder={defaultValue} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {optionValue.map((option, index) => (
            <SelectItem key={index} value={option} className={cn(`text-gray-500`, itemStyle)}>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
