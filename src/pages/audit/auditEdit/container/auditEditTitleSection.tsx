import { FilterDropDown } from '@/components/FilterDropDown/FilterDropDown';
import { useState } from 'react';

interface AuditEditTitleSectionProps {
  onTitleChange: (title: string) => void;
  onCategoryChange: (category: string) => void;
}

export function AuditEditTitleSection({ onTitleChange, onCategoryChange }: AuditEditTitleSectionProps) {
  const [title, setTitle] = useState<string>('');
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
          className="flex-1 rounded-xs border-[2px] border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
          placeholder="제목을 입력하세요"
        />
        <FilterDropDown
          className="flex h-full w-[90px] items-center justify-center text-center text-sm"
          defaultValue="카테고리"
          optionValue={['감사계획', '감사결과', '기타']}
          onValueChange={handleCategoryChange}
          value={category}
        />
      </div>
    </div>
  );
}
