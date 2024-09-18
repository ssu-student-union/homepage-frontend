import { useState, useImperativeHandle, forwardRef } from 'react';
import { FilterDropDown } from '@/components/FilterDropDown/FilterDropDown';

interface SectionProps {
  majorOptions: string[];
  middleOptions: { [key: string]: string[] };
  minorOptions: { [key: string]: string[] };
  onMajorOptionChange: (value: string) => void;
  onMiddleOptionChange: (value: string) => void;
  onMinorOptionChange: (value: string) => void;
}

// forwardRef를 사용하여 DropdownSection을 부모 컴포넌트에서 참조 가능하게 만듭니다.
const DropdownSection = forwardRef(
  (
    {
      majorOptions,
      middleOptions,
      minorOptions,
      onMajorOptionChange,
      onMiddleOptionChange,
      onMinorOptionChange,
    }: SectionProps,
    ref
  ) => {
    const [majorCategory, setMajorCategory] = useState('');
    const [middleCategory, setMiddleCategory] = useState('');
    const [minorCategory, setMinorCategory] = useState('');

    const middleCategoryOptions = Array.isArray(middleOptions[majorCategory]) ? middleOptions[majorCategory] : [];
    const minorCategoryOptions = Array.isArray(minorOptions[middleCategory]) ? minorOptions[middleCategory] : [];

    const handleMajorChange = (value: string) => {
      setMajorCategory(value);
      onMajorOptionChange(value);
      setMiddleCategory('');
      setMinorCategory('');
    };

    const handleMiddleChange = (value: string) => {
      setMiddleCategory(value);
      onMiddleOptionChange(value);
      setMinorCategory('');
    };

    const handleMinorChange = (value: string) => {
      setMinorCategory(value);
      onMinorOptionChange(value);
    };

    // 부모 컴포넌트에서 resetDropdowns 함수를 호출할 수 있도록 ref를 통해 함수를 노출
    useImperativeHandle(ref, () => ({
      resetDropdowns() {
        setMajorCategory('');
        setMiddleCategory('');
        setMinorCategory('');
      },
    }));

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
);

export default DropdownSection;
