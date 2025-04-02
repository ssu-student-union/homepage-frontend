import React, { useState } from 'react';

interface NoticeEditTitleSectionProps {
  initialTitle?: string;
  isUrgent?: boolean;
  setIsUrgent?: React.Dispatch<React.SetStateAction<boolean>>;
  onTitleChange: (title: string) => void;
  onUrgentChange?: (isUrgent: boolean) => void;
}

export function NoticeEditTitleSection({
  initialTitle = '',
  isUrgent,
  setIsUrgent,
  onTitleChange,
  onUrgentChange,
}: NoticeEditTitleSectionProps) {
  const [title, setTitle] = useState<string>(initialTitle);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;
    if (newTitle.length <= 80) {
      setTitle(newTitle);
      onTitleChange(newTitle);
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    setIsUrgent?.(newValue);
    if (onUrgentChange) {
      onUrgentChange(newValue);
    }
  };

  return (
    <div className="px-[30px] xl:px-[200px]">
      <div className="flex flex-col items-start justify-center gap-1 md:flex-row md:items-center md:gap-4">
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          className="w-full flex-1 rounded-xs border-[0.125rem] border-gray-300 px-3 py-[0.4rem] text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 md:text-base"
          placeholder="제목을 입력하세요"
        />
        {onUrgentChange && (
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isUrgent}
              onChange={handleCheckboxChange}
              className="h-4 w-4 rounded-xl border-gray-400 bg-gray-100 text-primary focus:ring-blue-500"
            />
            <span className="ml-2 font-semibold text-[#616161]">긴급공지</span>
          </label>
        )}
      </div>
    </div>
  );
}
