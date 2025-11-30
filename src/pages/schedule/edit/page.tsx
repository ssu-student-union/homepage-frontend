import { BoardHeader } from '@/components/BoardHeader';
import { Container } from '@/containers/new/Container';
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

  // 등록 버튼 활성화 조건: title, category, startDate, endDate가 모두 입력되어야 함
  const canSubmit = Boolean(title && category && startDate && endDate);

  const { mutate: createSchedule, isPending } = useCreateSchedule({
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
      <BoardHeader title="일정" className="border-b-neutral-200 max-md:px-5 md:border-b" />
      <Container className="py-[58px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <ScheduleBasicInfoForm
            titleRegister={register('title')}
            titleValue={title}
            titleError={errors.title}
            category={category}
            setValue={setValue}
            categoryError={errors.category}
          />
          <section className="mb-12">
            <h2 className="mb-4 text-xl font-semibold">등록할 일정의 시작일자와 종료일자를 선택해주세요.</h2>
            <ScheduleDatePicker
              startDate={startDate || null}
              endDate={endDate || null}
              onStartDateChange={(date) => {
                setValue('startDate', date || undefined);
              }}
              onEndDateChange={(date) => {
                setValue('endDate', date || undefined);
              }}
              setValue={setValue}
              startDateError={errors.startDate}
              endDateError={errors.endDate}
              control={control}
              isDDayError={errors.isDDay}
              canSubmit={canSubmit}
              onSubmit={() => handleSubmit(onSubmit)()}
            />
          </section>
        </form>
      </Container>
    </>
  );
}
