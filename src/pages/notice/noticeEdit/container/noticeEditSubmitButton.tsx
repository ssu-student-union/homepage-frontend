import { RegisterButton } from '@/components/Buttons/BoardActionButtons';

interface NoticeEditSubmitButtonProps {
  onSubmit: () => void;
  isLoading: boolean;
}

export function NoticeEditSubmitButton({ onSubmit, isLoading }: NoticeEditSubmitButtonProps) {
  return (
    <div className="flex items-end justify-end px-[30px] pb-[320px] pt-[32px] lg:pb-[160px] xl:px-[200px]">
      <RegisterButton className="h-[36px] w-full md:w-[80px]" onClick={onSubmit} disabled={isLoading} />
    </div>
  );
}
