import { useState } from 'react';
import { FilterDropDown } from '@/components/FilterDropDown/FilterDropDown';
import * as C from '@/pages/data/const/category';
import { cn } from '@/libs/utils';

export default function SortLayout() {
  const {
    selectedMajor,
    selectedMiddle,
    selectedMinor,
    middleOptions,
    minorOptions,
    setSelectedMajor,
    setSelectedMiddle,
    setSelectedMinor,
  } = useDataCategory();

  const defaultFilterStyle: string = 'w-full';

  return (
    <div className="mb-[5rem] mt-[3.375rem] flex flex-row justify-center gap-[0.75rem] px-[200px] xs:flex-col xs:px-10 sm:flex-col sm:px-10 md:px-10 lg:px-10">
      {/* 대분류 */}
      <FilterDropDown
        defaultValue="대분류"
        className={defaultFilterStyle}
        optionValue={C.majorOptions}
        onValueChange={(value) => {
          setSelectedMajor(value);
          setSelectedMiddle('');
          setSelectedMinor('');
        }}
        value={selectedMajor}
      />
      {/* 중분류 */}
      <FilterDropDown
        defaultValue="중분류"
        optionValue={middleOptions}
        onValueChange={(value) => {
          setSelectedMiddle(value);
          setSelectedMinor('');
        }}
        value={selectedMiddle}
        className={cn(defaultFilterStyle, !selectedMajor ? 'pointer-events-none' : '')}
        mainTextStyle={!selectedMajor ? 'text-gray-400' : ''}
      />
      {/* 소분류 */}
      <FilterDropDown
        defaultValue="소분류"
        optionValue={minorOptions}
        onValueChange={setSelectedMinor}
        value={selectedMinor}
        className={cn(defaultFilterStyle, !selectedMajor ? 'pointer-events-none' : '')}
        mainTextStyle={!selectedMiddle ? 'text-gray-400' : ''}
      />
    </div>
  );
}

// 대분류, 중분류, 소분류 상태 훅
function useDataCategory() {
  const [selectedMajor, setSelectedMajor] = useState(''); // 대분류 선택 상태
  const [selectedMiddle, setSelectedMiddle] = useState(''); // 중분류 선택 상태
  const [selectedMinor, setSelectedMinor] = useState(''); // 소분류 선택 상태

  // 선택된 대분류에 따라 중분류 목록 가져오기
  const middleOptions = selectedMajor ? C.middleOptions[selectedMajor] || [] : [];

  // 선택된 중분류에 따라 소분류 목록 가져오기
  const minorOptions = selectedMiddle ? C.minorOptions[selectedMiddle] || [] : [];

  return {
    selectedMajor,
    selectedMiddle,
    selectedMinor,
    middleOptions,
    minorOptions,
    setSelectedMajor,
    setSelectedMiddle,
    setSelectedMinor,
  };
}
