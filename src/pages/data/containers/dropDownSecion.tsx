import { useState } from 'react';
import { FilterDropDown } from '@/components/FilterDropDown/FilterDropDown';

interface SectionProps {
  majorOptions: string[];
  middleOptions: { [key: string]: string[] };
  minorOptions: { [key: string]: string[] };
  onMajorOptionChange: (value: string) => void;
  onMiddleOptionChange: (value: string) => void;
  onMinorOptionChange: (value: string) => void;
}

export function DropdownSection({
  majorOptions,
  middleOptions,
  minorOptions,
  onMajorOptionChange,
  onMiddleOptionChange,
  onMinorOptionChange,
}: SectionProps) {
  const [majorCategory, setMajorCategory] = useState('');
  const [middleCategory, setMiddleCategory] = useState('');
  const [minorCategory, setMinorCategory] = useState('');

  // Ensure middleCategoryOptions and minorCategoryOptions are arrays, defaulting to an empty array if undefined
  const middleCategoryOptions = Array.isArray(middleOptions[majorCategory]) ? middleOptions[majorCategory] : [];
  const minorCategoryOptions = Array.isArray(minorOptions[middleCategory]) ? minorOptions[middleCategory] : [];

  // Call the parent component's callback functions when the value changes
  const handleMajorChange = (value: string) => {
    setMajorCategory(value);
    onMajorOptionChange(value); // Notify parent component
    setMiddleCategory(''); // Reset dependent dropdowns
    setMinorCategory('');
  };

  const handleMiddleChange = (value: string) => {
    setMiddleCategory(value);
    onMiddleOptionChange(value); // Notify parent component
    setMinorCategory(''); // Reset dependent dropdown
  };

  const handleMinorChange = (value: string) => {
    setMinorCategory(value);
    onMinorOptionChange(value); // Notify parent component
  };

  return (
    <div className="mt-[70px] grid place-items-center xs:mt-6 sm:mt-6">
      <FilterDropDown
        defaultValue="대분류"
        optionValue={majorOptions}
        onValueChange={handleMajorChange}
        value={majorCategory}
        className="xs:w-[335px] sm:w-[335px]"
      />
      <div className="mt-4"></div>
      <div className={`xs:w-[335px] sm:w-[335px] ${!majorCategory ? 'pointer-events-none opacity-50' : ''}`}>
        <FilterDropDown
          defaultValue="중분류"
          optionValue={middleCategoryOptions}
          onValueChange={handleMiddleChange}
          value={middleCategory}
          className="xs:w-[335px] sm:w-[335px]"
        />
      </div>
      <div className="mt-4"></div>
      <div className={`xs:w-[335px] sm:w-[335px] ${!middleCategory ? 'pointer-events-none opacity-50' : ''}`}>
        <FilterDropDown
          defaultValue="소분류"
          optionValue={minorCategoryOptions}
          onValueChange={handleMinorChange}
          value={minorCategory}
          className="xs:w-[335px] sm:w-[335px]"
        />
      </div>
    </div>
  );
}
