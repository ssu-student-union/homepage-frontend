import { Input } from '@/components/ui/input';
import { cn } from '@/libs/utils';
import { UseFormRegisterReturn, FieldError } from 'react-hook-form';

interface ScheduleTitleInputProps {
  register: UseFormRegisterReturn<'title'>;
  value: string;
  error?: FieldError;
  maxLength?: number;
}

export function ScheduleTitleInput({ register, value, error, maxLength = 50 }: ScheduleTitleInputProps) {
  return (
    <div className="lg:flex-1">
      <div className="relative w-[326px] justify-center self-center md:w-full">
        <Input
          id="title"
          type="text"
          placeholder="제목을 입력하세요."
          maxLength={51}
          className="w-full !rounded-xl border-2 border-gray-300 py-4 pl-3 pr-16 text-xs font-medium placeholder:font-medium placeholder:text-gray-400 md:h-[60px] md:w-[338px] md:pl-5 md:text-base lg:w-full"
          {...register}
        />
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
          {value.length}/{maxLength}
        </span>
      </div>
      <div className="mt-1">
        <p
          className={cn(
            'text-sm text-red-500 transition-all',
            error ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
          )}
        >
          {error?.message}
        </p>
      </div>
    </div>
  );
}
