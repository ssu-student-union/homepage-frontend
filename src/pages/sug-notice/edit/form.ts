import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, DefaultValues } from 'react-hook-form';
import { SuggestPostWriteForm, SuggestWriteFormSchema } from '../schema';

export function useSuggestForm(defaultValues?: DefaultValues<SuggestPostWriteForm>) {
  const form = useForm<SuggestPostWriteForm>({
    resolver: zodResolver(SuggestWriteFormSchema),
    mode: 'onBlur',
    defaultValues,
  });

  return {
    ...form,
  };
}
