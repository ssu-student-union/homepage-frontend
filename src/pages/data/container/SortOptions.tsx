import { FilterDropDown } from '@/components/FilterDropDown/FilterDropDown';
import * as CATEGORIES from '@/pages/data/const/category';
import { cn } from '@/libs/utils';

interface SortLayoutProps {
  majorCategory: string;
  middleCategory: string;
  subCategory: string;
  onMajorChange: (value: string) => void;
  onMiddleChange: (value: string) => void;
  onMinorChange: (value: string) => void;
}

export default function SortOptions({
  majorCategory,
  middleCategory,
  subCategory,
  onMajorChange,
  onMiddleChange,
  onMinorChange,
}: SortLayoutProps) {
  const defaultFilterStyle: string = 'w-full border-primary';

  return (
    <div className="mb-[5rem] mt-[3.375rem] flex flex-col md:flex-row justify-center gap-[0.75rem] px-10 xl:px-[200px]">
      {/* 대분류 */}
      <FilterDropDown
        defaultValue="대분류"
        className={defaultFilterStyle}
        optionValue={CATEGORIES.majorOptions}
        onValueChange={(value) => {
          onMajorChange(value);
          onMiddleChange('');
          onMinorChange('');
        }}
        value={majorCategory}
      />
      {/* 중분류 */}
      <FilterDropDown
        defaultValue="중분류"
        optionValue={CATEGORIES.middleOptions[majorCategory] || []}
        onValueChange={(value) => {
          onMiddleChange(value);
          onMinorChange('');
        }}
        value={middleCategory}
        className={cn(defaultFilterStyle, majorCategory || 'pointer-events-none border-gray-500')}
      />
      {/* 소분류 */}
      <FilterDropDown
        defaultValue="소분류"
        optionValue={
          majorCategory === '선거관리위원회' && middleCategory !== '중앙선거관리위원회'
            ? (CATEGORIES.minorOptions?.[`${middleCategory}선거관리위원회`] ?? [])
            : (CATEGORIES.minorOptions?.[middleCategory.replace(/ /g, '_')] ?? [])
        }
        onValueChange={onMinorChange}
        value={subCategory}
        className={cn(defaultFilterStyle, middleCategory || 'pointer-events-none border-gray-500')}
      />
    </div>
  );
}
