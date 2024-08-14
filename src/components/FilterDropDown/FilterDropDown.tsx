import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/libs/utils';

interface FilterDropDownProps  extends React.HTMLAttributes<HTMLDivElement>  {
    defaultValue: string
    optionValue: string[]
    onValueChange: (value: string) => void
    value: string
}

export function FilterDropDown({ className, defaultValue, optionValue, onValueChange, value }: FilterDropDownProps) {
  const isSelected = !!value;

  return (
    <Select  onValueChange={onValueChange} value={value}>
      <SelectTrigger className={cn(`h-[67px] w-[411px] pl-9 ${isSelected ? 'text-gray-800' : 'text-gray-500'}`,className)}>
        <SelectValue placeholder={defaultValue} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {optionValue.map((option, index) => (
            <SelectItem key={index} value={option} className="text-gray-500">
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
