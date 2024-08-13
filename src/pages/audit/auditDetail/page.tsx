import { State } from '@/containers/common/Header/const/state';
import { Header } from '@/containers/common/Header/Header';
import { useLocation } from 'react-router-dom';
import { AuditDetailTopSection } from './container/auditDetailTopSection';
import { AuditDetailContentSection } from './container/auditDetailContentSection';

export function AuditDetailPage() {
  const location = useLocation();
  const postData = location.state?.postData;

  if (!postData) {
    return <div>데이터를 불러올 수 없습니다.</div>;
  }

  return (
    <>
      <Header state={State.Logout} />
      <AuditDetailTopSection title={postData.title} subTitle={postData.subTitle} />
      <AuditDetailContentSection />
    </>
  );
}
