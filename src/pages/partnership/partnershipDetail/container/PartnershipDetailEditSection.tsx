import { DeleteButton, EditButton, ListButton } from '@/components/Buttons/BoardActionButtons';
import { useDelBoardPosts } from '@/hooks/useDelBoardPosts';
import { useNavigate } from 'react-router-dom';
import { deleteHandler } from '../utils/deleteHandler';

interface PartnershipDetailEditProps {
  boardCode: string;
  postId: number;
}

export function PartnershipDetailEditSection({ boardCode, postId }: PartnershipDetailEditProps) {
  const navigate = useNavigate();
  const mutation = useDelBoardPosts();

  return (
    <div className="flex w-full justify-end py-[60px] sm:py-[40px]">
      <div className="flex w-[420px] flex-row items-end justify-between xs:h-[150px] xs:flex-col">
        <DeleteButton
          onClick={() => {
            deleteHandler({ boardCode, postId, mutation });
            navigate(`/partnership?category=notice`);
          }}
        />
        <EditButton />
        <ListButton onClick={() => navigate(-1)} />
      </div>
    </div>
  );
}
