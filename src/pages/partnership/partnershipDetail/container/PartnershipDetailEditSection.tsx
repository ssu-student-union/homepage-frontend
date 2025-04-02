import { DeleteButton, EditButton, ListButton } from '@/components/Buttons/BoardActionButtons';
import { useDelBoardPosts } from '@/hooks/api/del/useDelBoardPosts';
import { useNavigate } from 'react-router-dom';

interface PartnershipDetailEditProps {
  boardCode: string;
  postId: number;
  fileurl?: string[];
  authority: boolean;
}

export function PartnershipDetailEditSection({
  boardCode,
  postId,
  fileurl = [],
  authority,
}: PartnershipDetailEditProps) {
  const navigate = useNavigate();
  const { mutate } = useDelBoardPosts();

  return (
    <div className="flex w-full justify-end py-[40px] md:py-[60px]">
      <div className="flex h-[150px] flex-col items-end justify-between gap-4 sm:h-auto sm:flex-row">
        {authority ? (
          <>
            {' '}
            <DeleteButton
              onClick={() => {
                mutate({ boardCode, postId, fileurl });
                navigate('/partnership');
              }}
            />
            <EditButton onClick={() => navigate(`/partnership/${postId}/patch`, { state: { postId: postId } })} />
          </>
        ) : null}

        <ListButton onClick={() => navigate('/partnership')} />
      </div>
    </div>
  );
}
