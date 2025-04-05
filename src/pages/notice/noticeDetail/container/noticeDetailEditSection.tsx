import { DeleteButton, EditButton, ListButton } from '@/components/Buttons/BoardActionButtons';
import { useNavigate } from 'react-router';
import { handleLocation } from '../utils/locationHandler';
import { delBoardPosts } from '@/apis/delBoardPosts';
import { useQueryClient } from '@tanstack/react-query';

interface NoticeDetailEditProps {
  boardCode: string;
  postId: number;
  fileUrls: string[];
  imageUrls: string[];
  content: string;
  title: string;

  isAuthor: boolean;
}

export function NoticeDetailEditSection({ boardCode, postId, fileUrls, imageUrls, isAuthor }: NoticeDetailEditProps) {
  const navigate = useNavigate();

  const fileurl: string[] = [...fileUrls, ...imageUrls];

  const queryClient = useQueryClient();

  const handleDelete = async () => {
    await delBoardPosts(boardCode, postId, fileurl);
    queryClient.invalidateQueries({
      queryKey: ['get-board-boardCode-posts', boardCode],
    });
    navigate(`/notice`);
  };

  return (
    <div className="flex w-full justify-end py-[40px] md:py-[60px]">
      <div className="flex items-end justify-between gap-4 max-sm:h-[150px] max-sm:flex-col">
        {isAuthor ? (
          <>
            <DeleteButton onClick={handleDelete} className="max-md:w-[100px]" />
            <EditButton
              onClick={() =>
                handleLocation(
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

        <ListButton onClick={() => navigate(`/notice`)} className="sm:w-[100px]" />
      </div>
    </div>
  );
}
