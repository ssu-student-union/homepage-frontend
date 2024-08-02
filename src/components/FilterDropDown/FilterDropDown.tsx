import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FilterDropDownProps {
  defaultValue: string;
  optionValue: string[];
  onValueChange: (value: string) => void;
  value: string;
}

export function FilterDropDown({ defaultValue, optionValue, onValueChange, value }: FilterDropDownProps) {
  const isSelected = !!value;

  return (
    <Select onValueChange={onValueChange} value={value}>
      <SelectTrigger className={`h-[67px] w-[411px] pl-9 ${isSelected ? 'text-gray-800' : 'text-gray-500'}`}>
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
