import { useLocation } from 'react-router-dom';
import { AuditDetailTopSection } from './container/auditDetailTopSection';
import { AuditDetailContentSection } from './container/auditDetailContentSection';
import { AuditDetailFileSection } from './container/auditDetailFileSection';
import { AuditDetailEditSection } from './container/auditDetailEditSection';
export function AuditDetailPage() {
  const location = useLocation();
  const postData = location.state?.postData;

  if (!postData) {
    return <div>데이터를 불러올 수 없습니다.</div>;
  }

  return (
    <div className="px-[120px] xs:px-[20px] sm:px-[20px] md:px-[40px]">
      <AuditDetailTopSection title={postData.title} subTitle={postData.subTitle} />
      <AuditDetailContentSection text={postData.contentText} images={postData.contentImages} />
      <AuditDetailFileSection file={postData.file} />
      <AuditDetailEditSection />
    </div>
  );
}
