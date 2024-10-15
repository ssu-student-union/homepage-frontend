import { Fragment } from 'react';
import { FrontmatterInput } from '@/pages/human-rights/edit/components/FrontmatterInput.tsx';
import { cn } from '@/libs/utils.ts';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface FrontmatterEditProps<TFieldValues extends FieldValues> {
  id: string;
  items: {
    id: string;
    term: string;
    required?: boolean;
    value?: string;
    disabled?: boolean;
    registerPath?: Path<TFieldValues>;
  }[];
  register?: UseFormRegister<TFieldValues>;
}

export function FrontmatterEditor<TFieldValues extends FieldValues = NonNullable<unknown>>({
  id,
  items,
  register,
}: FrontmatterEditProps<TFieldValues>) {
  return (
    <div className="grid grid-cols-[auto_minmax(0,_1fr)] items-center gap-x-4 gap-y-3">
      {items.map(({ id: itemId, term, required, value, disabled, registerPath }) => (
        <Fragment key={`${id}_${itemId}_wrapper`}>
          <label
            htmlFor={`${id}_${itemId}`}
            className={cn(
              'w-fit font-semibold text-[#484848]',
              required && 'before:absolute before:-translate-x-full before:text-[#ff0000] before:content-["*"]'
            )}
          >
            {term}
          </label>
          {/* Input 컴포넌트를 사용하려 했으나 Input 컴포넌트의 기본 스타일의 크기가 규격과 맞지 않네요... */}
          <FrontmatterInput
            id={`${id}_${itemId}`}
            className="px-2 py-2"
            required={required}
            value={value}
            disabled={disabled}
            {...(register && registerPath ? register(registerPath) : {})}
          />
        </Fragment>
      ))}
    </div>
  );
}
