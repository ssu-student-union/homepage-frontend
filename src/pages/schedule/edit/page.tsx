import { BoardHeader } from '@/components/BoardHeader';
import { ScheduleBasicInfoForm } from '@/pages/schedule/components/form/ScheduleBasicInfoForm';
import { ScheduleDatePicker } from '@/pages/schedule/components/form/ScheduleDatePicker';
import { useScheduleForm } from '../hook/useScheduleForm';
import { transformScheduleFormToRequest, ScheduleEditForm } from '../schema';
import { SubmitHandler } from 'react-hook-form';
import { useCreateSchedule } from '../hook/mutations/useCreateSchedule';
import { useUpdateSchedule } from '../hook/mutations/useUpdateSchedule';
import { useGetSchedule } from '../hook/query/useGetSchedule';
import { useNavigate, useSearchParams } from 'react-router';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { parseISO } from 'date-fns';
import { checkSchedulePermission } from '../utils/checkSchedulePermission';
import { SCHEDULE_PERMISSION_MESSAGES, SCHEDULE_SUCCESS_MESSAGES, SCHEDULE_TITLE_MAX_LENGTH } from '../const/const';
import { handleScheduleError } from '../utils/handleScheduleError';

export function ScheduleEditPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const calendarEventId = searchParams.get('id') ? Number(searchParams.get('id')) : null;
  const isEditMode = calendarEventId !== null;

  // 권한 체크: 총학생회 또는 중앙집행위원회 계정만 접근 가능
  const hasPermission = useMemo(() => checkSchedulePermission(), []);

  // 권한이 없으면 리다이렉트
  useEffect(() => {
    if (!hasPermission) {
      toast.error(SCHEDULE_PERMISSION_MESSAGES.NO_PERMISSION);
      navigate('/schedule');
    }
  }, [hasPermission, navigate]);

  // 편집 모드일 때 일정 데이터 조회
  const { data: scheduleData, isLoading: isScheduleLoading } = useGetSchedule({
    calendarEventId: calendarEventId!,
    queryOptions: {
      enabled: isEditMode && hasPermission,
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    trigger,
    reset,
    formState: { errors },
  } = useScheduleForm({
    title: '',
    category: undefined,
    startDate: undefined,
    endDate: undefined,
    isDDay: false,
  });

  // 편집 모드일 때 기존 데이터를 폼에 설정
  useEffect(() => {
    if (isEditMode && scheduleData) {
      reset({
        title: scheduleData.title,
        category: scheduleData.calendarCategory,
        startDate: parseISO(scheduleData.startDate),
        endDate: parseISO(scheduleData.endDate),
        isDDay: scheduleData.isDDay,
      });
    }
  }, [isEditMode, scheduleData, reset]);

  const title = watch('title') || '';
  const category = watch('category') || '';
  const startDate = watch('startDate');
  const endDate = watch('endDate');

  // 등록 버튼 활성화 조건: title, category, startDate, endDate가 모두 입력되어야 하고, 제목은 최대 길이 이하여야 함
  const canSubmit = Boolean(title && category && startDate && endDate && title.length <= SCHEDULE_TITLE_MAX_LENGTH);

  const { mutate: createSchedule } = useCreateSchedule({
    mutationOptions: {
      onSuccess: () => {
        // 캐시를 무효화하여 /schedule 페이지로 이동할 때 최신 데이터를 가져오도록 함
        queryClient.invalidateQueries({ queryKey: ['getCalendars'] });
        toast.success(SCHEDULE_SUCCESS_MESSAGES.CREATED);
        navigate('/schedule');
      },
      onError: (error) => {
        handleScheduleError(error, 'create', '일정 등록 실패');
      },
    },
  });

  const { mutate: updateSchedule } = useUpdateSchedule({
    mutationOptions: {
      onSuccess: () => {
        // 캐시를 무효화하여 /schedule 페이지로 이동할 때 최신 데이터를 가져오도록 함
        queryClient.invalidateQueries({ queryKey: ['getCalendars'] });
        toast.success(SCHEDULE_SUCCESS_MESSAGES.UPDATED);
        navigate('/schedule');
      },
      onError: (error) => {
        handleScheduleError(error, 'update', '일정 수정 실패');
      },
    },
  });

  const onSubmit: SubmitHandler<ScheduleEditForm> = (formData) => {
    const requestData = transformScheduleFormToRequest(formData);
    if (isEditMode && calendarEventId !== null) {
      updateSchedule({ calendarEventId, schedule: requestData });
    } else {
      createSchedule({ schedule: requestData });
    }
  };

  // 권한이 없으면 아무것도 렌더링하지 않음 (리다이렉트 중)
  if (!hasPermission) {
    return null;
  }

  // 편집 모드일 때 데이터 로딩 중이면 로딩 표시
  if (isEditMode && isScheduleLoading) {
    return (
      <>
        <BoardHeader
          title="일정"
          className="border-b border-b-neutral-200 [&_h1]:px-4 [&_h1]:pb-[3.125rem] [&_h1]:text-[2.125rem]"
        />
        <section className="flex justify-center py-[58px]">
          <div className="flex items-center justify-center">
            <p className="text-gray-500">로딩 중...</p>
          </div>
        </section>
      </>
    );
  }

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
            isEditMode={isEditMode}
          />
        </form>
      </section>
    </>
  );
}
