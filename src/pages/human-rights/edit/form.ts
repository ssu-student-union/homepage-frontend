import { DefaultValues, useFieldArray, UseFieldArrayReturn, useForm } from 'react-hook-form';
import { MockHumanRightsPostEditRequest, MockHumanRightsPostEditRequestSchema } from '@/pages/human-rights/schema.ts';
import { zodResolver } from '@hookform/resolvers/zod';

type PrefixKeys<T, P extends string> = {
  [K in keyof T as K extends string ? `${P}${Capitalize<K>}` : never]: T[K];
};

function prefixKeys<T extends object, P extends string>(obj: T, prefix: P): PrefixKeys<T, P> {
  function capitalize<S extends string>(string: S): Capitalize<S> {
    return (string[0].toUpperCase() + string.slice(1)) as Capitalize<S>;
  }

  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [`${prefix}${capitalize(k)}`, v])) as PrefixKeys<T, P>;
}

export function useHumanRightsForm(defaultValues?: DefaultValues<MockHumanRightsPostEditRequest>) {
  const form = useForm<MockHumanRightsPostEditRequest>({
    resolver: zodResolver(MockHumanRightsPostEditRequestSchema),
    mode: 'onBlur',
    defaultValues,
  });
  const victimFieldArray: PrefixKeys<UseFieldArrayReturn<MockHumanRightsPostEditRequest>, 'victim'> = prefixKeys(
    useFieldArray<MockHumanRightsPostEditRequest>({
      control: form.control,
      name: 'metadata.victims',
      rules: { minLength: 1 },
    }),
    'victim'
  );
  const invaderFieldArray: PrefixKeys<UseFieldArrayReturn<MockHumanRightsPostEditRequest>, 'invader'> = prefixKeys(
    useFieldArray<MockHumanRightsPostEditRequest>({
      control: form.control,
      name: 'metadata.invaders',
      rules: { minLength: 1 },
    }),
    'invader'
  );
  return {
    ...form,
    ...victimFieldArray,
    ...invaderFieldArray,
  };
}
