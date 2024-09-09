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
  baseUrl?: string;
  noticeUrl?: string;
}

export function AuditDetailEditSection({
  boardCode,
  postId,
  fileUrls,
  imageUrls,
  baseUrl = `/`,
  noticeUrl = `/`,
}: AuditDetailEditProps) {
  const navigate = useNavigate();
  const mutPost = useDelBoardPosts();

  const fileurl = [...fileUrls, ...imageUrls];

  const handleDelete = async () => {
    await deleteHandler({ boardCode, postId, fileurl, mutPost });
    navigate(noticeUrl);
    window.location.reload();
  };

  return (
    <div className="flex w-full justify-end py-[60px] sm:py-[40px]">
      <div className="flex w-[420px] flex-row items-end justify-between xs:h-[150px] xs:flex-col">
        <DeleteButton onClick={handleDelete} />
        <EditButton onClick={() => navigate(`${baseUrl}/${postId}/patch`, { state: { postId: postId } })} />
        <ListButton onClick={() => navigate(noticeUrl)} />
      </div>
    </div>
  );
}
