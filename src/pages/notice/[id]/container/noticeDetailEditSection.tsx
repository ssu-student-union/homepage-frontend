import { DeleteButton, EditButton, ListButton } from '@/components/deprecated/Buttons/BoardActionButtons';
import { useNavigate } from 'react-router';
import { handleLocation } from '../utils/locationHandler';
import { ArticleFooter } from '@/containers/new/ArticleFooter';
import { NoticePost } from '@/pages/notice/schema';

interface NoticeDetailEditProps {
  className?: string;
  postId: number;
  editable: boolean;
  deletable: boolean;
  postDetail: NoticePost;
  handleDelete: () => void;
}

export function NoticeDetailEditSection({
  className,
  postId,
  editable,
  deletable,
  postDetail,
  handleDelete,
}: NoticeDetailEditProps) {
  const navigate = useNavigate();

  return (
    <ArticleFooter className={className}>
      <div className="flex w-full max-w-[1040px] justify-end gap-4">
        {editable && <DeleteButton onClick={handleDelete} className="max-md:w-[100px]" />}
        {deletable && (
          <EditButton
            onClick={() =>
              handleLocation(
                {
                  data: {
                    postId,
                    postDetail,
                  },
                },
                navigate
              )
            }
            className="sm:w-[100px]"
          />
        )}
        <ListButton onClick={() => navigate(`/notice`)} className="sm:w-[100px]" />
      </div>
    </ArticleFooter>
  );
}
