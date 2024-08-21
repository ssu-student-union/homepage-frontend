import { HeadLayout } from '@/template/HeadLayout';
import IntroNavSection from '../intro/container/IntroNavSection';
import { BodyLayout } from '@/template/BodyLayout';
import { AuditContent } from './component/AuditContent';
import { AuditSelector } from './component/AuditSelector';
import { usePagination } from './hooks/usePagination';

export function AuditPage() {
  const boardCode = '감사기구게시판';
  const accessToken =
    'eyJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2IiwiaWF0IjoxNzI0MjYxMzQwLCJleHAiOjE3MjQyNzIxNDB9.4RX1NtgtDpZFHLNfH1JK4vLB8dUFtO-F7fRNsKlK0Ns';

  const { currentPage, handlePageChange, currentPosts, totalPages, handleWriteClick, loading } = usePagination(
    boardCode,
    accessToken
  );
  return (
    <>
      <HeadLayout
        title="감사기구"
        subtitle="제12대 중앙감사위원회 한빛"
        borderOff={true}
        className="px-[200px] pb-[0px] xs:px-[30px] sm:px-[30px] md:px-[30px] lg:px-[30px]"
      />
      <IntroNavSection
        category="audit"
        switchIndex={1}
        mainClassName="xxl:ml-[200px] lg:ml-[30px] md:ml-[30px] xl:ml-[200px]"
      />
      <BodyLayout
        selector={
          <AuditSelector
            paramName="category"
            categories={['all', 'plan', 'result', 'ect']}
            labels={['전체', '감사계획', '감사결과', '기타']}
          />
        }
        children={loading ? <div>로딩...</div> : <AuditContent initPosts={currentPosts} />}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onWriteClick={handleWriteClick}
        className="ls:px-[30px] mt-[0px] w-full px-[200px] xs:px-[30px] sm:px-[30px] md:px-[30px]"
      />
    </>
  );
}
