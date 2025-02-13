import { DefaultValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DataPostEditForm, DataPostEditFormSchema } from '@/pages/data/schema';

export function useDataForm(defaultValues?: DefaultValues<DataPostEditForm>) {
  const form = useForm<DataPostEditForm>({
    resolver: zodResolver(DataPostEditFormSchema),
    mode: 'onBlur',
    defaultValues,
  });
  return {
    ...form,
  };
}
