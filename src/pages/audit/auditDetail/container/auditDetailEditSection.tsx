import { DeleteButton, EditButton, ListButton } from '@/components/Buttons/BoardActionButtons';
import { useDelBoardPosts } from '@/hooks/useDelBoardPosts';
import { useNavigate } from 'react-router-dom';
import { deleteHandler } from '../utils/deleteHandler';

interface AuditDetailEditProps {
  boardCode: string;
  postId: number;
  fileUrls: string[];
  imageUrls: string[];
  content: string;
  title: string;
  category: string;
  thumbnailImage: string;
}

export function AuditDetailEditSection({ boardCode, postId, fileUrls, imageUrls }: AuditDetailEditProps) {
  const navigate = useNavigate();
  const mutPost = useDelBoardPosts();

  const fileurl = [...fileUrls, ...imageUrls];

  const handleDelete = async () => {
    await deleteHandler({ boardCode, postId, fileurl, mutPost });
    navigate(`/homepage-frontend/audit?category=notice`);
    window.location.reload();
  };

  return (
    <div className="flex w-full justify-end py-[60px] sm:py-[40px]">
      <div className="flex w-[420px] flex-row items-end justify-between xs:h-[150px] xs:flex-col">
        <DeleteButton onClick={handleDelete} />
        <EditButton
          onClick={() => navigate(`/homepage-frontend/audit/${postId}/patch`, { state: { postId: postId } })}
        />
        <ListButton onClick={() => navigate(`/homepage-frontend/audit?category=notice`)} />
      </div>
    </div>
  );
}
