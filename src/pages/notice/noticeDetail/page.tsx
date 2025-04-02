import { NoticeDetailTopSection } from './container/noticeDetailTopSection';
import { NoticeDetailContentSection } from './container/noticeDetailContentSection';
import { NoticeDetailEditSection } from './container/noticeDetailEditSection';
import { useGetBoardDetail } from '@/hooks/api/get/useGetBoardDetail';
import { NoticeDetailFileSection } from './container/noticeDetailFileSection';
import NoticeDetailLoading from './container/noticeDetailLoading';
import { usePostId } from '@/hooks/usePostId';

export function NoticeDetailPage() {
  const postId = usePostId();

  const boardCode: string = '공지사항게시판';

  const { data: resp, isLoading, isError } = useGetBoardDetail({ boardCode, postId });

  const postDetail = resp?.data.postDetailResDto;

  if (!postDetail || isError) {
    return <div>에러 발생!!!</div>;
  }

  const fileList =
    postDetail?.fileResponseList?.filter((file) => file.fileType === 'files').map((file) => file.fileUrl) || [];
  const fileNames =
    postDetail?.fileResponseList?.filter((file) => file.fileType === 'files').map((file) => file.fileName) || [];

  const imageList =
    postDetail?.fileResponseList?.filter((file) => file.fileType === 'images').map((file) => file.fileUrl) || [];

  const fileUrls = [...fileList, ...imageList];

  return (
    <div className="px-[20px] md:px-[40px] lg:px-[120px]">
      <NoticeDetailTopSection title={postDetail.title} author={postDetail.authorName} date={postDetail.createdAt} />
      {isLoading ? (
        <NoticeDetailLoading />
      ) : (
        <>
          <NoticeDetailContentSection content={postDetail.content} images={imageList} />
          <NoticeDetailFileSection files={fileList} fileNames={fileNames} />
          <NoticeDetailEditSection
            title={postDetail.title}
            content={postDetail.content}
            isAuthor={postDetail.isAuthor}
            imageUrls={imageList}
            boardCode={boardCode}
            postId={postId}
            fileUrls={fileUrls}
          />
        </>
      )}
    </div>
  );
}
