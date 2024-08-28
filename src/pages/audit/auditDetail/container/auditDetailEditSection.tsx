import { DeleteButton, EditButton, ListButton } from '@/components/Buttons/BoardActionButtons';
import { useDelBoardPosts } from '@/hooks/useDelBoardPosts';
import { useNavigate } from 'react-router-dom';
import { deleteHandler } from '../utils/deleteHandler';
import { useDelBoardFiles } from '@/hooks/useDelBoardFiles';

interface AuditDetailEditProps {
  boardCode: string;
  postId: number;
  fileUrls: string[];
}

export function AuditDetailEditSection({ boardCode, postId, fileUrls }: AuditDetailEditProps) {
  const navigate = useNavigate();
  const mutFile = useDelBoardFiles();
  const mutPost = useDelBoardPosts();

  const handleDelete = async () => {
    await deleteHandler({ boardCode, postId, fileUrls, mutFile, mutPost });
    navigate(`/audit?category=notice`);
  };

  return (
    <div className="flex w-full justify-end py-[60px] sm:py-[40px]">
      <div className="flex w-[420px] flex-row items-end justify-between xs:h-[150px] xs:flex-col">
        <DeleteButton onClick={handleDelete} />
        <EditButton />
        <ListButton onClick={() => navigate(-1)} />
      </div>
    </div>
  );
}
