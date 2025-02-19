import { DeleteButton, EditButton, ListButton } from '@/components/Buttons/BoardActionButtons';
import { useNavigate } from 'react-router-dom';
import { serviceNoticeHandleLocation } from '../../../../notice/noticeDetail/utils/locationHandler';
import { delBoardPosts } from '@/apis/delBoardPosts';
import { useQueryClient } from '@tanstack/react-query';

interface NoticeDetailEditProps {
  boardCode: string;
  postId: number;
  fileUrls: string[];
  imageUrls: string[];
  content: string;
  title: string;

  isAuthor?: boolean;
}

export function ServiceNoticeDetailEditSection({
  boardCode,
  postId,
  fileUrls,
  imageUrls,
  isAuthor,
}: NoticeDetailEditProps) {
  const navigate = useNavigate();

  const fileurl: string[] = [...fileUrls, ...imageUrls];

  const queryClient = useQueryClient();

  const handleDelete = async () => {
    await delBoardPosts(boardCode, postId, fileurl);
    queryClient.invalidateQueries({
      queryKey: ['get-board-boardCode-posts', boardCode],
    });
    navigate(`/service-notice`);
  };

  return (
    <div className="flex w-full justify-end py-[60px] sm:py-[40px]">
      <div className="flex items-end justify-between gap-4 xs:h-[150px] xs:flex-col">
        {isAuthor ? (
          <>
            <DeleteButton onClick={handleDelete} className="sm:w-[100px]" />
            <EditButton
              onClick={() =>
                serviceNoticeHandleLocation(
                  {
                    data: {
                      postId,
                    },
                  },
                  navigate
                )
              }
              className="sm:w-[100px]"
            />
          </>
        ) : null}
        <a href="/service-notice">
          <ListButton className="sm:w-[100px]" />
        </a>
      </div>
    </div>
  );
}
