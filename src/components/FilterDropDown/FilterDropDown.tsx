import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/libs/utils';

interface FilterDropDownProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue: string;
  optionValue: string[];
  onValueChange: (value: string) => void;
  value: string;
  mainTextStyle?: string;
  itemStyle?: string;
}

export function FilterDropDown({
  className,
  defaultValue,
  optionValue,
  onValueChange,
  value,
  mainTextStyle = '',
  itemStyle = '',
}: FilterDropDownProps) {
  const isSelected = !!value;

  return (
    <Select onValueChange={onValueChange} value={value}>
      <SelectTrigger
        className={cn(`h-[67px] w-[411px] pl-9 ${isSelected ? 'text-gray-800' : 'text-gray-500'}`, className)}
      >
        <SelectValue className={cn(mainTextStyle)} placeholder={defaultValue} />
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
