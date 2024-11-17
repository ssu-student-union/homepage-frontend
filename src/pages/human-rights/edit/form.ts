import { DefaultValues, useFieldArray, UseFieldArrayReturn, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { HumanRightsPostEditForm, HumanRightsPostEditFormSchema } from '@/pages/human-rights/schema.ts';

/**
 * PrefixKeys 유틸리티
 * Object의 각 key에 camelCase를 유지하며 접두사를 붙입니다.
 *
 * 예시:
 * ```typescript
 * const original: OriginalObject = { test: 'hello', world: 'vanquisher' };
 * const prefixed: PrefixKeys<OriginalObject, 'hello'> = prefixKeys(original, 'hello');
 * console.log(prefixed) // { helloTest: 'hello', helloWorld: 'vanquisher' }
 * ```
 */
type PrefixKeys<T, P extends string> = {
  [K in keyof T as K extends string ? `${P}${Capitalize<K>}` : never]: T[K];
};

function prefixKeys<T extends object, P extends string>(obj: T, prefix: P): PrefixKeys<T, P> {
  function capitalize<S extends string>(string: S): Capitalize<S> {
    return (string[0].toUpperCase() + string.slice(1)) as Capitalize<S>;
  }

  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [`${prefix}${capitalize(k)}`, v])) as PrefixKeys<T, P>;
}

export function useHumanRightsForm(defaultValues?: DefaultValues<HumanRightsPostEditForm>) {
  const form = useForm<HumanRightsPostEditForm>({
    resolver: zodResolver(HumanRightsPostEditFormSchema),
    mode: 'onBlur',
    defaultValues,
  });
  const victimFieldArray: PrefixKeys<UseFieldArrayReturn<HumanRightsPostEditForm>, 'victim'> = prefixKeys(
    useFieldArray<HumanRightsPostEditForm>({
      control: form.control,
      name: 'rightsDetailList.victims',
      rules: { minLength: 1 },
    }),
    'victim'
  );
  const attackerFieldArray: PrefixKeys<UseFieldArrayReturn<HumanRightsPostEditForm>, 'attacker'> = prefixKeys(
    useFieldArray<HumanRightsPostEditForm>({
      control: form.control,
      name: 'rightsDetailList.attackers',
      rules: { minLength: 1 },
    }),
    'attacker'
  );
  return {
    ...form,
    ...victimFieldArray,
    ...attackerFieldArray,
  };
}
