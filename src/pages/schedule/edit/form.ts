import { DefaultValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ScheduleEditForm, ScheduleEditFormSchema } from '../schema';

export function useScheduleForm(defaultValues?: DefaultValues<ScheduleEditForm>) {
  const form = useForm<ScheduleEditForm>({
    resolver: zodResolver(ScheduleEditFormSchema),
    mode: 'onBlur',
    defaultValues,
  });
  return {
    ...form,
  };
}
