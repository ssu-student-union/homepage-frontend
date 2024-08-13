import { State } from '@/containers/common/Header/const/state';
import { Header } from '@/containers/common/Header/Header';
import { HeadLayout } from '@/template/HeadLayout';
import IntroNavSection from '../intro/container/IntroNavSection';
import { BodyLayout } from '@/template/BodyLayout';
import { useAuditPageSet } from './hooks/useAuditPageSet';
import { AuditContent } from './component/AuditContent';
import { AuditSelector } from './component/AuditSelector';
import { fakeData } from './const/fakeData';

export function AuditPage() {
  const { currentPage, handlePageChange, size, currentPosts, totalPages, handleWriteClick } = useAuditPageSet(fakeData);

  return (
    <>
      <Header state={State.Logout} />
      <HeadLayout title="감사기구" subtitle="제12대 중앙감사위원회 한빛" borderOff={true} />
      <IntroNavSection category="audit" switchIndex={1} />
      <BodyLayout
        selector={
          <AuditSelector
            paramName="category"
            categories={['all', 'plan', 'result', 'ect']}
            labels={['전체', '감사계획', '감사결과', '기타']}
          />
        }
        content={<AuditContent posts={currentPosts} size={size} />}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onWriteClick={handleWriteClick}
      />
    </>
  );
}
