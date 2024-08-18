import { RegisterButton } from '@/components/Buttons/BoardActionButtons';

interface AuditEditSubmitButtonProps {}

export function AuditEditSubmitButton({}: AuditEditSubmitButtonProps) {
  return (
    <>
      <div className="xs:pb-[320px]sm:pb-[320px] flex items-end justify-end pb-[160px] pt-[32px] md:pb-[320px]">
        <RegisterButton className="h-[36px] w-[80px] xs:w-full sm:w-full" />
      </div>
    </>
  );
}
