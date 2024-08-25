import { RegisterButton } from '@/components/Buttons/BoardActionButtons';

interface AuditEditSubmitButtonProps {
  onSubmit: () => void;
  isLoading: boolean;
}

export function AuditEditSubmitButton({ onSubmit, isLoading }: AuditEditSubmitButtonProps) {
  return (
    <div className="flex items-end justify-end px-[200px] pb-[160px] pt-[32px] xs:px-[30px] xs:pb-[320px] sm:px-[30px] sm:pb-[320px] md:px-[30px] md:pb-[320px] lg:px-[30px]">
      <RegisterButton className="h-[36px] w-[80px] xs:w-full sm:w-full" onClick={onSubmit} disabled={isLoading} />
    </div>
  );
}
