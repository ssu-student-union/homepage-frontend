import { DeleteButton, EditButton, ListButton } from '@/components/deprecated/Buttons/BoardActionButtons';
import { useNavigate } from 'react-router';
import { LostArticlePost } from '@/pages/lost-article/schema';
import { ArticleFooter } from '@/containers/new/ArticleFooter';
import { lostArticleHandleLocation } from '@/pages/notice/[id]/utils/locationHandler';

interface AuditDetailEditProps {
  className?: string;
    postId: number;
    editable: boolean;
    deletable: boolean;
    postDetail: LostArticlePost;
    handleDelete: () => void;
}

export function AuditDetailEditSection({
  className,
  postId,
  editable,
  deletable,
  postDetail,
  handleDelete
}: AuditDetailEditProps) {
  const navigate = useNavigate();

  //const fileurl = [...fileUrls, ...imageUrls];

  // const handleDelete = async () => {
  //   await delBoardPosts(boardCode, postId, fileurl);
  //   navigate(noticeUrl);
  //   window.location.reload();
  // };

  return (
    <ArticleFooter className={className}>
          <div className="flex w-full max-w-[1040px] justify-end gap-4">
            {editable && <DeleteButton onClick={handleDelete} className="max-md:w-[100px]" />}
            {deletable && (
              <EditButton
                onClick={() =>
                  lostArticleHandleLocation(
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
            <ListButton onClick={() => navigate('/lost-article')} className="sm:w-[100px]" />
          </div>
        </ArticleFooter>
  );
}
