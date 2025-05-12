import { DeleteButton, EditButton, ListButton } from '@/components/deprecated/Buttons/BoardActionButtons';
import { useNavigate } from 'react-router';
import { delBoardPosts } from '@/apis/delBoardPosts';

interface AuditDetailEditProps {
  boardCode: string;
  postId: number;
  fileUrls: string[];
  imageUrls: string[];
  content: string;
  title: string;
  authority?: string[];
  isAuthor: boolean;
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
  isAuthor,
}: AuditDetailEditProps) {
  const navigate = useNavigate();

  const fileurl = [...fileUrls, ...imageUrls];

  const handleDelete = async () => {
    await delBoardPosts(boardCode, postId, fileurl);
    navigate(noticeUrl);
    window.location.reload();
  };

  return (
    <div className="flex w-full justify-end py-[40px] md:py-[60px]">
      <div className="flex h-[150px] flex-col items-end justify-between gap-4 sm:h-auto sm:flex-row">
        {isAuthor ? (
          <>
            <DeleteButton onClick={handleDelete} />
            <EditButton onClick={() => navigate(`${baseUrl}/${postId}/patch`, { state: { postId: postId } })} />
          </>
        ) : null}
        <ListButton onClick={() => navigate(noticeUrl)} />
      </div>
    </div>
  );
}
