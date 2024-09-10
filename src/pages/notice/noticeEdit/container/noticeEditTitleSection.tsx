import { useState } from 'react';

interface NoticeEditTitleSectionProps {
  initialTitle?: string;
  onTitleChange: (title: string) => void;
  onUrgentChange: (isUrgent: boolean) => void;
}

export function NoticeEditTitleSection({
  initialTitle = '',
  onTitleChange,
  onUrgentChange,
}: NoticeEditTitleSectionProps) {
  const [title, setTitle] = useState<string>(initialTitle);
  const [isUrgent, setIsUrgent] = useState<boolean>(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    onTitleChange(event.target.value);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    setIsUrgent(newValue);
    onUrgentChange(newValue);
  };

  return (
    <div className="px-[200px] xs:px-[30px] sm:px-[30px] md:px-[30px] lg:px-[30px]">
      <div className="flex flex-row items-center justify-center gap-4 xs:flex-col xs:items-start xs:gap-1 sm:flex-col sm:items-start sm:gap-1">
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          className="w-full flex-1 rounded-xs border-[0.125rem] border-gray-300 px-3 py-[0.4rem] shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
          placeholder="제목을 입력하세요"
        />
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={isUrgent}
            onChange={handleCheckboxChange}
            className="h-4 w-4 rounded-xl border-gray-400 bg-gray-100 text-primary focus:ring-blue-500"
          />
          <span className="ml-2 font-semibold text-[#616161]">긴급공지</span>
        </label>
      </div>
    </div>
  );
}
