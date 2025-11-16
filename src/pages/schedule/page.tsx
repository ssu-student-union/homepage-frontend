import { BoardHeader } from '@/components/BoardHeader';
import { BoardContainer } from '@/components/BoardContainer';
import { useState } from 'react';
import { Category } from '@/components/Category';
import { DateGrid } from './components/DateGrid';
import { ScheduleDetailCard } from './components/ScheduleDetailCard';
import { SCHEDULE_CATEGORIES, type ScheduleCategory } from './const/const';

export function SchedulePage() {
  const [selectedCategory, setSelectedCategory] = useState<ScheduleCategory>('전체');
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <>
      <BoardHeader title="일정" className="border-b-neutral-200 max-md:px-5 md:border-b" />
      <div className="mb-1 flex justify-center px-4 md:px-[72px] lg:px-[200px]">
        <div className="flex w-full max-w-[1040px] gap-2 py-5 max-md:overflow-x-auto">
          {SCHEDULE_CATEGORIES.map((category) => (
            <Category
              key={category}
              isActive={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Category>
          ))}
        </div>
      </div>
      <BoardContainer isEmpty={false}>
        <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-stretch lg:gap-[2.8125rem]">
          <div className="2xl:px-[60px] w-full shrink-0 px-0 md:w-[602px] md:min-w-[602px] md:max-w-[602px] lg:px-0 xl:px-[42px]">
            <DateGrid selectedDate={currentDate} setSelectedDate={setCurrentDate} />
          </div>
          <div className="2xl:px-[60px] flex w-full justify-center lg:min-w-0 lg:shrink lg:flex-col lg:px-0 xl:px-[42px]">
            <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto md:w-[33.625rem] lg:w-auto lg:min-w-[23.125rem] lg:max-w-[33.625rem] lg:basis-[33.625rem]">
              <ScheduleDetailCard
                category="학사"
                title="2024-2학기 기말강의평가기간"
                dateRange="12월 9일 ~ 12월 20일"
              />
            </div>
          </div>
        </div>
      </BoardContainer>
    </>
  );
}
