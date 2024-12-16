import { DeleteButton, EditButton, ListButton } from '@/components/Buttons/BoardActionButtons';
import { useNavigate } from 'react-router-dom';
import { ServiceNoticeHandleLocation } from '../../../../notice/noticeDetail/utils/locationHandler';
//import { delBoardPosts } from '@/apis/delBoardPosts';

interface NoticeDetailEditProps {
  boardCode: string;
  postId: number;
  fileUrls: string[];
  imageUrls: string[];
  content: string;
  title: string;

  isAuthor: boolean;
}

export function ServiceNoticeDetailEditSection({ boardCode, postId, fileUrls, imageUrls, isAuthor }: NoticeDetailEditProps) {
  const navigate = useNavigate();

  //const fileurl: string[] = [...fileUrls, ...imageUrls];

  const handleDelete = async () => {
    //await delBoardPosts(boardCode, postId, fileurl);
    console.log("API 대기");
    navigate(`/service-notice`);
  };

  return (
    <div className="flex w-full justify-end py-[60px] sm:py-[40px]">
      <div className="flex items-end justify-between gap-4 xs:h-[150px] xs:flex-col">
        {isAuthor ? (
          <>
            <DeleteButton onClick={handleDelete} />
            <EditButton
              onClick={() =>
                ServiceNoticeHandleLocation(
                  {
                    data: {
                      postId,
                    },
                  },
                  navigate
                )
              }
            />
          </>
        ) : null}

        <ListButton onClick={() => navigate(`/notice`)} />
      </div>
    </div>
  );
}
