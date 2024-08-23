import React, { useState } from 'react';
import { FilterDropDown } from '@/components/FilterDropDown/FilterDropDown';

export function AuditEditTitleSection() {
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  return (
    <div className="pt-[32px]">
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
