import { RegisterButton } from '@/components/Buttons/BoardActionButtons';

interface AuditEditSubmitButtonProps {}

export function AuditEditSubmitButton({}: AuditEditSubmitButtonProps) {
  return (
    <>
      <div className="flex items-end justify-end px-[120px] pb-[160px] pt-[32px] xs:px-[20px] xs:pb-[320px] sm:px-[40px] sm:pb-[320px] md:pb-[320px]">
        <RegisterButton className="h-[36px] w-[80px] xs:w-full sm:w-full" />
      </div>
    </>
  );
}
