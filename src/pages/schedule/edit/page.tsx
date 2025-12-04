import { BoardHeader } from '@/components/BoardHeader';
import { ScheduleBasicInfoForm } from '@/pages/schedule/components/form/ScheduleBasicInfoForm';
import { ScheduleDatePicker } from '@/pages/schedule/components/form/ScheduleDatePicker';
import { useScheduleForm } from '../hook/useScheduleForm';
import { transformScheduleFormToRequest, ScheduleEditForm } from '../schema';
import { SubmitHandler } from 'react-hook-form';
import { useCreateSchedule } from '../hook/mutations/useCreateSchedule';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

export function ScheduleEditPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    trigger,
    formState: { errors },
  } = useScheduleForm({
    title: '',
    category: undefined,
    startDate: undefined,
    endDate: undefined,
    isDDay: false,
  });

  const title = watch('title') || '';
  const category = watch('category') || '';
  const startDate = watch('startDate');
  const endDate = watch('endDate');

  // 등록 버튼 활성화 조건: title, category, startDate, endDate가 모두 입력되어야 하고, 제목은 50자 이하여야 함
  const canSubmit = Boolean(title && category && startDate && endDate && title.length <= 50);

  const { mutate: createSchedule } = useCreateSchedule({
    mutationOptions: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['getCalendars'] });
        navigate('/schedule');
      },
      onError: (error) => {
        console.error('일정 등록 실패:', error);
        toast.error('일정 등록에 실패했습니다. 다시 시도해주세요.');
      },
    },
  });

  const onSubmit: SubmitHandler<ScheduleEditForm> = (formData) => {
    const requestData = transformScheduleFormToRequest(formData);
    createSchedule({ schedule: requestData });
  };

  return (
    <>
      <BoardHeader
        title="일정"
        className="border-b border-b-neutral-200 [&_h1]:px-4 [&_h1]:pb-[3.125rem] [&_h1]:text-[2.125rem]"
      />
      <section className="flex justify-center py-[58px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full max-w-[320px] flex-col items-center md:max-w-screen-md xl:max-w-[1200px]"
        >
          <ScheduleBasicInfoForm
            titleRegister={register('title')}
            titleValue={title}
            titleError={errors.title}
            category={category}
            setValue={setValue}
            categoryError={errors.category}
          />

          <div className="my-[60px] w-full max-w-[326px] border-t border-[#E7E7E7] md:my-[80px] md:max-w-[660px]" />

          <ScheduleDatePicker
            startDate={startDate || null}
            endDate={endDate || null}
            onStartDateChange={(date) => {
              // @ts-expect-error - setValue accepts undefined for optional fields
              setValue('startDate', date || undefined, { shouldValidate: true });
              if (date) {
                trigger(['title', 'category']);
              }
            }}
            onEndDateChange={(date) => {
              // @ts-expect-error - setValue accepts undefined for optional fields
              setValue('endDate', date || undefined, { shouldValidate: true });
              if (date) {
                trigger(['title', 'category']);
              }
            }}
            setValue={setValue}
            startDateError={errors.startDate}
            endDateError={errors.endDate}
            control={control}
            isDDayError={errors.isDDay}
            canSubmit={canSubmit}
            onSubmit={() => handleSubmit(onSubmit)()}
          />
        </form>
      </section>
    </>
  );
}
