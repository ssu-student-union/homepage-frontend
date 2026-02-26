import { FilterDropDown } from '@/components/FilterDropDown';
import { SCHEDULE_CATEGORY_OPTIONS } from '@/pages/schedule/const/const';
import { ScheduleTitleInput } from './ScheduleTitleInput';
import { UseFormRegisterReturn, UseFormSetValue, FieldError } from 'react-hook-form';
import { ScheduleEditForm } from '../../schema';
import { cn } from '@/libs/utils';

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
    <section className="mb-12 flex w-full flex-col items-center justify-center md:pl-6">
      <h2 className="mb-6 w-full text-lg font-semibold md:text-2xl lg:text-[1.75rem]">
        등록할 일정의 <br className="md:hidden" />
        제목과 카테고리를 입력해주세요.
      </h2>
      <div className="flex w-full flex-col gap-2 md:flex-row md:gap-5">
        <ScheduleTitleInput register={titleRegister} value={titleValue} error={titleError} />
        <div className="w-[326px] justify-center md:w-[206px] lg:w-[250px]">
          <FilterDropDown
            defaultValue="카테고리"
            optionValue={Array.from(SCHEDULE_CATEGORY_OPTIONS)}
            onValueChange={(value) =>
              setValue('category', value as ScheduleEditForm['category'], { shouldValidate: true })
            }
            value={category}
            className="w-full !rounded-xl border-2 border-gray-300 px-5 py-4 text-xs font-medium md:!h-[60px]"
            itemStyle="text-base font-medium"
          />
          <div className="mt-1">
            <p
              className={cn(
                'text-sm text-red-500 transition-all',
                categoryError ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
              )}
            >
              {categoryError?.message}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
