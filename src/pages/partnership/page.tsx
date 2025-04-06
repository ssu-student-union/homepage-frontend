import { HeadLayout } from '@/template/HeadLayout';
import { BodyLayout } from '@/template/BodyLayout';
import { Spacing } from '@/components/Spacing';
import { BoardSelector } from '@/components/deprecated/Board/BoardSelector';
import { PartnershipSubcategories } from './const';
import { useBoardSelect } from '@/hooks/useBoardSelect';
import { PartnershipSubcategoriesType } from './type';
import { useNavigate } from 'react-router';
import { useMemo } from 'react';
import { usePartnership } from './hook/usePartnership';
import { BoardContent } from '@/template/board/BoardContent';

export function PartnershipPage() {
  const navigate = useNavigate();

  const { selectedSubcategories, onSubcategorySelect } = useBoardSelect<PartnershipSubcategoriesType>(
    PartnershipSubcategories[0]
  );

  const { data, isLoading, totalPages, currentPage, handlePageChange } = usePartnership(
    '제휴게시판',
    selectedSubcategories
  );

  const partnershipCount = useMemo(() => {
    if (isLoading) {
      return 0;
    } else if (data?.data.pageInfo.totalElements === undefined) {
      return 0;
    }
    return data?.data.pageInfo.totalElements;
  }, [data?.data.pageInfo.totalElements, isLoading]);

  return (
    <>
      <HeadLayout
        title="제휴안내"
        subtitle={
          <p className="font-bold">
            <span>총 </span>
            <span className="text-primary">{`${partnershipCount}개`}</span>
            <span>{`의 제휴혜택이 있어요!`}</span>
          </p>
        }
      />
      <BodyLayout
        totalPages={totalPages ?? 1}
        currentPage={currentPage}
        onPageChange={(number) => {
          handlePageChange(number);
        }}
        onWriteClick={() => {
          window.scrollTo(0, 0);
          navigate('/partnership/edit');
        }}
        authority={data?.data.allowedAuthorities}
      >
        <BoardSelector
          subcategories={PartnershipSubcategories}
          selectedSubcategory={selectedSubcategories}
          onSubcategorySelect={onSubcategorySelect}
        />
        <Spacing size={40} direction="vertical"></Spacing>
        <BoardContent
          boardName="제휴게시판"
          data={data?.data.postListResDto}
          isDenied={data?.data.deniedAuthorities.includes('READ')}
          isLoading={isLoading}
          isPartnership={true}
        />
      </BodyLayout>
    </>
  );
}
