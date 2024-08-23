import { useLocation } from 'react-router-dom';
import { AuditDetailTopSection } from './container/auditDetailTopSection';
import { AuditDetailContentSection } from './container/auditDetailContentSection';
import { AuditDetailEditSection } from './container/auditDetailEditSection';
import { useGetBoardDetail } from '@/hooks/useGetBoardDetail';

export function AuditDetailPage() {
  const location = useLocation();
  const postId = location.state?.postId;
  const boardCode = '감사기구게시판';

  const { postDetail } = useGetBoardDetail({ boardCode, postId });
  console.log('pageData: ', postDetail);

  if (postDetail == null) {
    return null;
  }
  return (
    <div className="px-[120px] xs:px-[20px] sm:px-[20px] md:px-[40px]">
      <AuditDetailTopSection title={postDetail.title} date={postDetail.createdAt} />
      <AuditDetailContentSection content={postDetail.content} />
      {/* <AuditDetailFileSection file={postDetail.file} /> */}
      <AuditDetailEditSection />
    </div>
  );
}
