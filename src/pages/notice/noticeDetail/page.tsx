import { useLocation } from 'react-router-dom';
import { NoticeDetailTopSection } from './container/noticeDetailTopSection';
import { NoticeDetailContentSection } from './container/noticeDetailContentSection';
import { NoticeDetailEditSection } from './container/noticeDetailEditSection';
import { useGetBoardDetail } from '@/hooks/useGetBoardDetail';
import { NoticeDetailFileSection } from './container/noticeDetailFileSection';
import NoticeDetailLoading from './container/noticeDetailLoading';

export function NoticeDetailPage() {
  const location = useLocation();
  const postId: number = location.state?.postId;
  const category: string = location.state?.category;
  const thumbnailImage: string = location.state?.thumbnailImage;
  const boardCode: string = '공지사항게시판';

  const { data: resp, isLoading, isError } = useGetBoardDetail({ boardCode, postId });

  const postDetail = resp?.data.postDetailResDto;

  if (!postDetail || isError) {
    return <div>에러 발생!!!</div>;
  }

  const fileUrls = [...(postDetail.fileList || []), ...(postDetail.imageList || [])];

  return (
    <div className="px-[120px] xs:px-[20px] sm:px-[20px] md:px-[40px]">
      <NoticeDetailTopSection title={postDetail.title} date={postDetail.createdAt} />
      {isLoading ? (
        <NoticeDetailLoading />
      ) : (
        <>
          <NoticeDetailContentSection content={postDetail.content} images={postDetail.imageList} />
          <NoticeDetailFileSection files={postDetail.fileList} />
          <NoticeDetailEditSection
            title={postDetail.title}
            content={postDetail.content}
            category={category}
            imageUrls={postDetail.imageList}
            boardCode={boardCode}
            postId={postId}
            fileUrls={fileUrls}
            thumbnailImage={thumbnailImage}
          />
        </>
      )}
    </div>
  );
}
