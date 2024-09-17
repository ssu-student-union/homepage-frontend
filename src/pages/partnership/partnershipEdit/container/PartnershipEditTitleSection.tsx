import { FilterDropDown } from '@/components/FilterDropDown/FilterDropDown';
import { useState } from 'react';

interface PartnershipEditTitleSectionProps {
  onTitleChange: (title: string) => void;
  onCategoryChange: (category: string) => void;
  initialValue?: string;
}

export function PartnershipEditTitleSection({
  onTitleChange,
  onCategoryChange,
  initialValue = '',
}: PartnershipEditTitleSectionProps) {
  const [title, setTitle] = useState<string>(initialValue);
  const [category, setCategory] = useState<string>('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    onTitleChange(event.target.value);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    onCategoryChange(value);
  };

  return (
    <div className="px-[200px] xs:px-[30px] sm:px-[30px] md:px-[30px] lg:px-[30px]">
      <div className="flex flex-row gap-4">
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          className="w-full flex-1 rounded-xs border-[0.125rem] border-gray-300 px-3 py-[0.4rem] shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
          placeholder="제목을 입력하세요"
        />
        <FilterDropDown
          className="sm-hidden xs-hidden flex h-[2.5rem] w-[6rem] items-center justify-center rounded-xs border-[0.125rem] border-gray-300 px-[0.4rem] py-[0.35rem] text-sm font-bold text-gray-500"
          itemStyle="py-0 pr-0 text-base font-bold text-gray-500"
          defaultValue="카테고리"
          optionValue={['의료', '문화', '뷰티', '건강', '음식', '교육', '주거']}
          onValueChange={handleCategoryChange}
          value={category}
        />
      </div>
    </div>
  );
}
