import { DeleteButton, EditButton, ListButton } from '@/components/Buttons/BoardActionButtons';
import { useDelBoardPosts } from '@/hooks/useDelBoardPosts';
import { useNavigate } from 'react-router-dom';

interface PartnershipDetailEditProps {
  boardCode: string;
  postId: number;
  fileurl?: string[];
}

export function PartnershipDetailEditSection({ boardCode, postId, fileurl = [] }: PartnershipDetailEditProps) {
  const navigate = useNavigate();
  const { mutate } = useDelBoardPosts();

  return (
    <div className="flex w-full justify-end py-[60px] sm:py-[40px]">
      <div className="flex w-[420px] flex-row items-end justify-between xs:h-[150px] xs:flex-col">
        <DeleteButton
          onClick={() => {
            mutate({ boardCode, postId, fileurl });
            navigate('/partnership');
          }}
        />
        <EditButton onClick={() => navigate(`/partnership/${postId}/patch`, { state: { postId: postId } })} />
        <ListButton onClick={() => navigate('/partnership')} />
      </div>
    </div>
  );
}
