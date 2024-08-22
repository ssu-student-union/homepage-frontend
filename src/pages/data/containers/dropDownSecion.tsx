import { useState } from 'react';
import { FilterDropDown } from '@/components/FilterDropDown/FilterDropDown';

interface SectionProps {
  majorOptions: string[];
  middleOptions: { [key: string]: string[] };
  minorOptions: { [key: string]: string[] };
}

export function DropdownSection({ majorOptions, middleOptions, minorOptions }: SectionProps) {
  const [majorCategory, setMajorCategory] = useState('');
  const [middleCategory, setMiddleCategory] = useState('');
  const [minorCategory, setMinorCategory] = useState('');

  const middleCategoryOptions = majorCategory ? middleOptions[majorCategory] : [];
  const minorCategoryOptions = middleCategory ? minorOptions[middleCategory] : [];

  return (
    <div className="mt-[70px] grid place-items-center xs:mt-6 sm:mt-6">
      <FilterDropDown
        defaultValue="대분류"
        optionValue={majorOptions}
        onValueChange={setMajorCategory}
        value={majorCategory}
        className="xs:w-[335px] sm:w-[335px]"
      />
      <div className="mt-4"></div>
      <div className={`xs:w-[335px] sm:w-[335px] ${!majorCategory ? 'pointer-events-none opacity-50' : ''}`}>
        <FilterDropDown
          defaultValue="중분류"
          optionValue={middleCategoryOptions}
          onValueChange={setMiddleCategory}
          value={middleCategory}
          className="xs:w-[335px] sm:w-[335px]"
        />
      </div>
      <div className="mt-4"></div>
      <div className={`xs:w-[335px] sm:w-[335px] ${!middleCategory ? 'pointer-events-none opacity-50' : ''}`}>
        <FilterDropDown
          defaultValue="소분류"
          optionValue={minorCategoryOptions}
          onValueChange={setMinorCategory}
          value={minorCategory}
          className="xs:w-[335px] sm:w-[335px]"
        />
      </div>
    </div>
  );
}
