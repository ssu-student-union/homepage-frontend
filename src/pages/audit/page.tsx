import { HeadLayout } from '@/template/HeadLayout';
import IntroNavSection from '../intro/container/IntroNavSection';
import { BodyLayout } from '@/template/BodyLayout';
import { AuditContent } from './component/AuditContent';
import { AuditSelector } from './component/AuditSelector';
import { usePagination } from './hooks/usePagination';

export function AuditPage() {
  const boardCode = '감사기구게시판';
  const groupCode = '감사위원회';
  const memberCode = '중앙감사위원회';
  const accessToken =
    'eyJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2IiwiaWF0IjoxNzI0MTQwNzg2LCJleHAiOjE3MjQxNTE1ODZ9.08W4GhLHHCEaip7od0ou2JuDk7Zqyl60-KKTAbfFFKM';

  const { currentPage, handlePageChange, size, currentPosts, totalPages, handleWriteClick } = usePagination(
    boardCode,
    groupCode,
    memberCode,
    accessToken
  );

  return (
    <>
      <HeadLayout
        title="감사기구"
        subtitle="제12대 중앙감사위원회 한빛"
        borderOff={true}
        className="px-[120px] pb-[0px] xs:px-[30px] sm:px-[30px] md:px-[30px] lg:px-[30px]"
      />
      <IntroNavSection category="audit" switchIndex={1} mainClassName="lg:ml-[30px] md:ml-[30px]" />
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
        className="ls:px-[30px] mt-[0px] w-full px-[120px] xs:px-[30px] sm:px-[30px] md:px-[30px]"
      />
    </>
  );
}
