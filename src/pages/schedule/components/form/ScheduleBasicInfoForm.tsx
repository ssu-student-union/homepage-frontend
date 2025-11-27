import { FilterDropDown } from '@/components/FilterDropDown';
import { SCHEDULE_CATEGORY_OPTIONS } from '@/pages/schedule/const/const';
import { ScheduleTitleInput } from './ScheduleTitleInput';
import { UseFormRegisterReturn, UseFormSetValue, FieldError } from 'react-hook-form';
import { ScheduleEditForm } from '../../schema';

interface ScheduleBasicInfoFormProps {
  titleRegister: UseFormRegisterReturn<'title'>;
  titleValue: string;
  titleError?: FieldError;
  category: string;
  setValue: UseFormSetValue<ScheduleEditForm>;
  categoryError?: FieldError;
}

export function ScheduleBasicInfoForm({
  titleRegister,
  titleValue,
  titleError,
  category,
  setValue,
  categoryError,
}: ScheduleBasicInfoFormProps) {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-xl font-semibold">등록할 일정의 제목과 카테고리를 입력해주세요.</h2>
      <div className="flex flex-col gap-4 md:flex-row md:gap-4">
        <ScheduleTitleInput register={titleRegister} value={titleValue} error={titleError} />
        <div className="w-full md:w-[200px] lg:w-[250px]">
          <FilterDropDown
            defaultValue="카테고리"
            optionValue={SCHEDULE_CATEGORY_OPTIONS}
            onValueChange={(value) => setValue('category', value as ScheduleEditForm['category'])}
            value={category}
            className="!h-[3.75rem] w-full border-2 border-gray-300 text-[18px] font-medium"
            itemStyle="text-[18px] font-medium"
          />
          {categoryError && <p className="mt-1 text-sm text-red-500">{categoryError.message}</p>}
        </div>
      </div>
    </section>
  );
}
