import { Fragment } from 'react';
import { FrontmatterInput } from '@/pages/human-rights/edit/components/FrontmatterInput.tsx';
import { cn } from '@/libs/utils.ts';
import { FieldErrors, FieldValues, get, Path, UseFormRegister } from 'react-hook-form';

interface FrontmatterEditProps<TFieldValues extends FieldValues> {
  id: string;
  items: {
    id: string;
    term: string;
    required?: boolean;
    value?: string;
    disabled?: boolean;
    errorMessage?: string;
    registerPath?: Path<TFieldValues>;
  }[];
  errors: FieldErrors<TFieldValues>;
  register?: UseFormRegister<TFieldValues>;
}

export function FrontmatterEditor<TFieldValues extends FieldValues = NonNullable<unknown>>({
  id,
  items,
  errors,
  register,
}: FrontmatterEditProps<TFieldValues>) {
  return (
    <div className="grid grid-cols-[auto_minmax(0,_1fr)] items-start gap-x-4 gap-y-3">
      {items.map(({ id: itemId, term, required, value, disabled, errorMessage, registerPath }) => {
        const error = get(errors, registerPath)?.type;
        return (
          <Fragment key={`${id}_${itemId}_wrapper`}>
            <label
              htmlFor={`${id}_${itemId}`}
              className={cn(
                'mt-2.5 w-fit font-semibold text-[#484848]',
                required && 'before:absolute before:-translate-x-full before:text-[#ff0000] before:content-["*"]'
              )}
            >
              {term}
            </label>
            {/* Input 컴포넌트를 사용하려 했으나 Input 컴포넌트의 기본 스타일의 크기가 규격과 맞지 않네요... */}
            <div className="flex flex-col">
              <FrontmatterInput
                id={`${id}_${itemId}`}
                className="px-2 py-2"
                required={required}
                value={value}
                disabled={disabled}
                {...(register && registerPath ? register(registerPath) : {})}
              />
              <p
                className={cn(
                  'mt-1 text-sm text-red-700 transition-all',
                  error ? 'h-5 translate-y-0 opacity-100' : 'h-0 -translate-y-2 opacity-0'
                )}
              >
                {errorMessage ?? error}
              </p>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
