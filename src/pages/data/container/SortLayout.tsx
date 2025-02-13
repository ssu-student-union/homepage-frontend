import { FilterDropDown } from '@/components/FilterDropDown/FilterDropDown';
import * as C from '@/pages/data/const/category';
import { cn } from '@/libs/utils';

interface SortLayoutProps {
  majorCategory: string;
  middleCategory: string;
  subCategory: string;
  setMajor: (value: string) => void;
  setMiddle: (value: string) => void;
  setMinor: (value: string) => void;
}

export default function SortLayout({
  majorCategory,
  middleCategory,
  subCategory,
  setMajor,
  setMiddle,
  setMinor,
}: SortLayoutProps) {
  const defaultFilterStyle: string = 'w-full';

  return (
    <div className="mb-[5rem] mt-[3.375rem] flex flex-row justify-center gap-[0.75rem] px-[200px] xs:flex-col xs:px-10 sm:flex-col sm:px-10 md:px-10 lg:px-10">
      {/* 대분류 */}
      <FilterDropDown
        defaultValue="대분류"
        className={defaultFilterStyle}
        optionValue={C.majorOptions}
        onValueChange={(value) => {
          setMajor(value);
          setMiddle('');
          setMinor('');
        }}
        value={majorCategory}
      />
      {/* 중분류 */}
      <FilterDropDown
        defaultValue="중분류"
        optionValue={C.middleOptions[majorCategory] || []}
        onValueChange={(value) => {
          setMiddle(value);
          setMinor('');
        }}
        value={middleCategory}
        className={cn(defaultFilterStyle, !majorCategory ? 'pointer-events-none' : '')}
        mainTextStyle={!majorCategory ? 'text-gray-400' : ''}
      />
      {/* 소분류 */}
      <FilterDropDown
        defaultValue="소분류"
        optionValue={C.minorOptions[middleCategory] || []}
        onValueChange={setMinor}
        value={subCategory}
        className={cn(defaultFilterStyle, !majorCategory ? 'pointer-events-none' : '')}
        mainTextStyle={!middleCategory ? 'text-gray-400' : ''}
      />
    </div>
  );
}
