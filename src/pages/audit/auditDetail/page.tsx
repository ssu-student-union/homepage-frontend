import { useLocation } from 'react-router-dom';
import { AuditDetailTopSection } from './container/auditDetailTopSection';
import { AuditDetailContentSection } from './container/auditDetailContentSection';
import { AuditDetailEditSection } from './container/auditDetailEditSection';
import { useGetBoardDetail } from '@/hooks/useGetBoardDetail';

export function AuditDetailPage() {
  const location = useLocation();
  const postId: number = location.state?.postId;
  const boardCode: string = '감사기구게시판';

  const { data: resp, isLoading, error } = useGetBoardDetail({ boardCode, postId });

  const postDetail = resp?.data.postDetailResDto;

  if (!postDetail) {
    return <div></div>;
  }

  const fileUrls = [...(postDetail.fileList || []), ...(postDetail.imageList || [])];

  return (
    <div className="px-[120px] xs:px-[20px] sm:px-[20px] md:px-[40px]">
      <AuditDetailTopSection title={postDetail.title} date={postDetail.createdAt} />
      <AuditDetailContentSection content={postDetail.content} images={postDetail.imageList} />
      {/* <AuditDetailFileSection files={postDetail.fileList} /> */}
      <AuditDetailEditSection boardCode={boardCode} postId={postId} fileUrls={fileUrls} />
    </div>
  );
}
