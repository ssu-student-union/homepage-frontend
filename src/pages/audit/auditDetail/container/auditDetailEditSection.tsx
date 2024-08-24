import { DeleteButton, EditButton, ListButton } from '@/components/Buttons/BoardActionButtons';
import { useNavigate } from 'react-router-dom';

interface AuditDetailEditProps {}

export function AuditDetailEditSection({}: AuditDetailEditProps) {
  const navigate = useNavigate();

  return (
    <div className="flex w-full justify-end py-[60px] sm:py-[40px]">
      <div className="flex w-[420px] flex-row items-end justify-between xs:h-[150px] xs:flex-col">
        <DeleteButton />
        <EditButton />
        <ListButton onClick={() => navigate(-1)} />
      </div>
    </div>
  );
}
