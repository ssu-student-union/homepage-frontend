import { BoardSelector } from '@/components/Board/BoardSelector';
import { useNavigate } from 'react-router-dom';
import { PetitionPostContent } from '../../../components/PostContent/PetitionPostContent';
import { useCurrentPage } from '@/hooks/useCurrentPage';
import { BodyLayout } from '@/template/BodyLayout';
import { useBoardSelect } from '@/hooks/useBoardSelect';
import { PetitionSubcategoriesType } from '../type';
import { PetitionSubcategories } from '../const';
import { Spacing } from '@/components/Spacing';
import { useEffect } from 'react';
import { useGetPetitionTopLiked } from '@/hooks/useGetPetitionPostsTopLiked';

export function PetitionPostSection() {
  const navigate = useNavigate();
  const { currentPage, handlePageChange } = useCurrentPage(1);
  const { selectedSubcategories, onSubcategorySelect } = useBoardSelect<PetitionSubcategoriesType>(
    PetitionSubcategories[0]
  );

  const { data, refetch, isLoading } = useGetPetitionTopLiked({ page: currentPage - 1, take: 10 });

  // const { isLoading, data, refetch } = useQuery({
  //   queryKey: ['petition-notice-post', currentPage, selectedSubcategories],
  //   queryFn: () => getPetitionNoticeListApi(currentPage - 1, 10),
  //   staleTime: 60 * 1000 * 5,
  // });

  useEffect(() => {
    refetch();
  }, [selectedSubcategories, currentPage, refetch]);

  const filteredData =
    selectedSubcategories === '전체'
      ? data?.data.postListResDto
      : data?.data.postListResDto.filter((item) => item.onGoingStatus === selectedSubcategories);

  const handleWriteBtnClick = () => {
    navigate('/petition-notice/edit');
  };

  const handlePostDetail = (id: number) => {
    navigate(`/petition-notice/${id}`);
  };

  const handleSubcategorySelect = (category: PetitionSubcategoriesType) => {
    onSubcategorySelect(category);
    handlePageChange(1); // 카테고리가 변경되면 첫 페이지로 돌아갑니다
  };

  return (
    <BodyLayout
      title="청원글"
      totalPages={data?.data.pageInfo.totalPages as number}
      currentPage={currentPage}
      onPageChange={handlePageChange}
      onWriteClick={handleWriteBtnClick}
    >
      <BoardSelector
        subcategories={PetitionSubcategories}
        selectedSubcategory={selectedSubcategories}
        onSubcategorySelect={handleSubcategorySelect}
      />
      <Spacing size={40} direction="vertical"></Spacing>
      {isLoading ? (
        <div>로딩중..</div>
      ) : (
        <>
          {filteredData &&
            filteredData.map((data) => (
              <PetitionPostContent data={data} key={data.postId} onClick={handlePostDetail} />
            ))}
        </>
      )}
    </BodyLayout>
  );
}
