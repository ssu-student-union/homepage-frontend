import { BoardSelector } from '@/components/Board/BoardSelector';
import { useNavigate } from 'react-router-dom';
import { PetitionPostContent } from '../../../components/PostContent/PetitionPostContent';
import { useCurrentPage } from '@/hooks/useCurrentPage';
import { BodyLayout } from '@/template/BodyLayout';
import { useBoardSelect } from '@/hooks/useBoardSelect';
import { PetitionSubcategoriesType } from '../type';
import { PetitionSubcategories } from '../const';
import { Spacing } from '@/components/Spacing';
import { useGetBoardPosts } from '@/hooks/useGetBoardPosts';
import { PetitionPostsTopLikedResponse } from '@/types/getPetitionTopLiked';

export function PetitionPostSection() {
  const navigate = useNavigate();
  const { currentPage, handlePageChange } = useCurrentPage(1);
  const { selectedSubcategories, onSubcategorySelect } = useBoardSelect<PetitionSubcategoriesType>(
    PetitionSubcategories[0]
  );

  const { data, isLoading } = useGetBoardPosts<PetitionPostsTopLikedResponse>({
    page: currentPage - 1,
    take: 10,
    boardCode: '청원게시판',
  });

  const filteredData =
    selectedSubcategories === '전체'
      ? data?.data.postListResDto
      : data?.data.postListResDto.filter((item) => item.onGoingStatus === selectedSubcategories);

  const handleWriteBtnClick = () => {
    if (localStorage.getItem('kakaoData')) {
      navigate('/petition-notice/edit');
    } else {
      window.alert('청원 글 작성은 로그인 후 이용이 가능합니다!');
      navigate('/');
    }
  };

  const handlePostDetail = (id: number) => {
    navigate(`/petition-notice/${id}`);
  };

  const handleSubcategorySelect = (category: PetitionSubcategoriesType) => {
    onSubcategorySelect(category);
    handlePageChange(1);
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
