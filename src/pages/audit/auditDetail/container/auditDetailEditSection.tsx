import { DeleteButton, EditButton, ListButton } from '@/components/Buttons/BoardActionButtons';
import { useDelBoardPosts } from '@/hooks/useDelBoardPosts';
import { useNavigate } from 'react-router-dom';
import { deleteHandler } from '../utils/deleteHandler';
import { useDelBoardFiles } from '@/hooks/useDelBoardFiles';
import { handleLocation } from '../utils/locationHandler';

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

export function AuditDetailEditSection({
  boardCode,
  postId,
  fileUrls,
  imageUrls,
  content,
  title,
  category,
  thumbnailImage,
}: AuditDetailEditProps) {
  const navigate = useNavigate();
  const mutFile = useDelBoardFiles();
  const mutPost = useDelBoardPosts();

  const handleDelete = async () => {
    await deleteHandler({ boardCode, postId, fileUrls, mutFile, mutPost });
    navigate(`/audit?category=notice`);
    window.location.reload();
  };

  return (
    <div className="flex w-full justify-end py-[60px] sm:py-[40px]">
      <div className="flex w-[420px] flex-row items-end justify-between xs:h-[150px] xs:flex-col">
        <DeleteButton onClick={handleDelete} />
        <EditButton
          onClick={() =>
            handleLocation(
              {
                data: {
                  postId,
                  title,
                  content,
                  category,
                  imageUrls,
                  thumbnailImage,
                },
              },
              navigate
            )
          }
        />
        <ListButton onClick={() => navigate(-1)} />
      </div>
    </div>
  );
}
