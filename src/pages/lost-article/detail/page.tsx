import { useGetBoardDetail } from '@/hooks/useGetBoardDetail';
import { AuditDetailContentSection } from '@/pages/audit/auditDetail/container/auditDetailContentSection';
import { AuditDetailEditSection } from '@/pages/audit/auditDetail/container/auditDetailEditSection';
import AuditDetailLoading from '@/pages/audit/auditDetail/container/auditDetailLoading';
import { useLocation } from 'react-router-dom';
import { items } from './const/data';
import { LostDetailTopSection } from './container/lostDetailTopSection';

export function LostDetailPage() {
  const location = useLocation();
  const postId: number = location.state?.postId;
  const boardCode: string = '분실물게시판';

  const { data: resp, isLoading, isError } = useGetBoardDetail({ boardCode, postId });

  const postDetail = resp?.data.postDetailResDto;

  if (!postDetail || isError) {
    return <div>에러 발생!!!</div>;
  }

  const fileUrls = [...(postDetail.fileList || []), ...(postDetail.imageList || [])];

  return (
    <div className="px-[120px] xs:px-[20px] sm:px-[20px] md:px-[40px]">
      <LostDetailTopSection
        authorName={postDetail.authorName}
        items={items}
        title={postDetail.title}
        date={postDetail.createdAt}
      />
      {isLoading ? (
        <AuditDetailLoading />
      ) : (
        <>
          <AuditDetailContentSection content={postDetail.content} images={postDetail.imageList} />
          <AuditDetailEditSection
            title={postDetail.title}
            content={postDetail.content}
            imageUrls={postDetail.imageList}
            boardCode={boardCode}
            postId={postId}
            fileUrls={fileUrls}
            baseUrl="/lost-article"
            noticeUrl="/lost-article?category=state"
          />
        </>
      )}
    </div>
  );
}
