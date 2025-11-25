import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Controller, Control, FieldError } from 'react-hook-form';
import { ScheduleEditForm } from '../../schema';

interface ScheduleDDayCheckboxProps {
  control: Control<ScheduleEditForm>;
  error?: FieldError;
}

export function ScheduleDDayCheckbox({ control, error }: ScheduleDDayCheckboxProps) {
  return (
    <div className="flex flex-col gap-2">
      <Controller
        name="isDDay"
        control={control}
        render={({ field }) => (
          <div className="flex items-center gap-2">
            <Checkbox
              id="isDDay"
              checked={field.value || false}
              onCheckedChange={(checked) => {
                field.onChange(checked);
              }}
              className="rounded-none"
            />
            <Label htmlFor="isDDay" className="cursor-pointer text-base font-medium">
              D-DAY 추가
            </Label>
          </div>
        )}
      />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
}
