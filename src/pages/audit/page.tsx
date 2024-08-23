import { HeadLayout } from '@/template/HeadLayout';
import { BodyLayout } from '@/template/BodyLayout';
import { AuditContent } from './component/AuditContent';
import { AuditSelector } from './component/AuditSelector';
import { IntroNavSection } from '../intro/container/IntroNavSection';
import { useGetBoardBoardCodePosts } from '@/hooks/useGetBoardBoardCodePosts';
import { useResponseBoard } from '../../hooks/useResponseBoard';

import { useEffect } from 'react';

export function AuditPage() {
  const boardCode = '감사기구게시판';
  const accessToken =
    'eyJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2IiwiaWF0IjoxNzI0MjYxMzQwLCJleHAiOjE3MjQyNzIxNDB9.4RX1NtgtDpZFHLNfH1JK4vLB8dUFtO-F7fRNsKlK0Ns';

  const { itemsPerPage } = useResponseBoard();

  const { posts, currentPage, setCurrentPage, totalPages, refetch } = useGetBoardBoardCodePosts({
    boardCode,
    accessToken,
    take: itemsPerPage,
  });

  useEffect(() => {
    refetch();
  }, [itemsPerPage]);

  return (
    <>
      <HeadLayout
        title="감사기구"
        subtitle="제12대 중앙감사위원회 한빛"
        borderOff={true}
        className="px-[200px] xs:px-[30px] sm:px-[30px] md:px-[30px] lg:px-[30px]"
      />
      <IntroNavSection
        categoryParam="audit"
        subCategoryParam="notice"
        handleSelection={() => {}}
        mainCategoryName="게시판"
        subCategoryDisplayName="게시판"
      />
      <BodyLayout
        selector={
          <AuditSelector
            paramName="category"
            categories={['all', 'plan', 'result', 'ect']}
            labels={['전체', '감사계획', '감사결과', '기타']}
          />
        }
        children={<AuditContent initPosts={posts} />}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
        onWriteClick={() => {}}
        className="ls:px-[30px] mt-[0px] w-full px-[200px] xs:px-[30px] sm:px-[30px] md:px-[30px]"
      />
    </>
  );
}
