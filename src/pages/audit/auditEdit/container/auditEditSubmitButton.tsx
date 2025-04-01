import { RegisterButton } from '@/components/Buttons/BoardActionButtons';

interface AuditEditSubmitButtonProps {
  onSubmit: () => void;
  isLoading: boolean;
}

export function AuditEditSubmitButton({ onSubmit, isLoading }: AuditEditSubmitButtonProps) {
  return (
    <div className="flex items-end justify-end px-[30px] xl:px-[200px] pb-[320px] lg:pb-[160px] pt-[32px]">
      <RegisterButton className="h-[36px] w-full md:w-[80px]" onClick={onSubmit} disabled={isLoading} />
    </div>
  );
}
