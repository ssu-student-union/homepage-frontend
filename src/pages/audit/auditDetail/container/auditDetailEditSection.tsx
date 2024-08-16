import { DeleteButton, EditButton, ListButton } from '@/components/Buttons/BoardActionButtons';

interface AuditDetailEditProps {}

export function AuditDetailEditSection({}: AuditDetailEditProps) {
  return (
    <div className="flex w-full justify-end px-[120px] py-[60px] xs:px-[20px] sm:px-[40px] sm:py-[40px]">
      <div className="flex w-[420px] flex-row items-end justify-between xs:h-[150px] xs:flex-col">
        <DeleteButton />
        <EditButton />
        <ListButton />
      </div>
    </div>
  );
}