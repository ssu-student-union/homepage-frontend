import { DefaultValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DataPostEditFormSchema, DataPostEditForm } from '../../schema';

/**
 * 동적으로 스키마를 생성하여 폼 훅에 전달
 * @param categoryKey - 카테고리 키
 * @param defaultValues - 폼 초기값
 */
export function useDataForm(categoryKey: string[], defaultValues?: DefaultValues<DataPostEditForm>) {
  const schema = DataPostEditFormSchema(categoryKey);

  const form = useForm<DataPostEditForm>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues,
  });

  return {
    ...form,
  };
}
