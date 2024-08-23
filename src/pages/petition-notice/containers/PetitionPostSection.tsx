import { BoardSelector } from '@/components/Board/BoardSelector';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PetitionPostContent } from '../../../components/PostContent/PetitionPostContent';
import { useCurrentPage } from '@/hooks/useCurrentPage';
import { PAGE_PER_GROUP } from '@/components/Pagination/const';
import { BodyLayout } from '@/template/BodyLayout';
import { useBoardSelect } from '@/hooks/useBoardSelect';
import { PetitionSubcategoriesType } from '../type';
import { PetitionSubcategories } from '../const';
import { Spacing } from '@/components/Spacing';

export function PetitionPostSection() {
  const navigate = useNavigate();
  const { currentPage, handlePageChange } = useCurrentPage(1);
  const { selectedSubcategories, onSubcategorySelect } = useBoardSelect<PetitionSubcategoriesType>(
    PetitionSubcategories[0]
  );

  const filteredData = useMemo(() => {
    if (selectedSubcategories === '전체') {
      return TEST_DATA;
    }
    return TEST_DATA.filter((item) => item.state === selectedSubcategories);
  }, [selectedSubcategories]);

  const displayedPostContent = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_PER_GROUP;
    return filteredData.slice(startIndex, startIndex + PAGE_PER_GROUP);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / PAGE_PER_GROUP);

  const handleWriteBtnClick = () => {
    navigate('/petition-notice/edit');
  };

  // Page 메인 컨텐츠 들어가는 자리
  const movePostContentDetail = (id: number) => {
    navigate(`/petition-notice/${id}`);
  };

  return (
    <BodyLayout
      title="청원글"
      totalPages={totalPages}
      currentPage={currentPage}
      onPageChange={handlePageChange}
      onWriteClick={handleWriteBtnClick}
    >
      <BoardSelector
        subcategories={PetitionSubcategories}
        selectedSubcategory={selectedSubcategories}
        onSubcategorySelect={onSubcategorySelect}
      />
      <Spacing size={40} direction="vertical"></Spacing>
      {displayedPostContent.map((data, index) => (
        <PetitionPostContent data={data} key={index} onClick={movePostContentDetail} />
      ))}
    </BodyLayout>
  );
}
