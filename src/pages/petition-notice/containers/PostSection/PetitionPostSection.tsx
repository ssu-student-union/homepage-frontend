import { BoardSelector } from '@/components/Board/BoardSelector';
import { useNavigate } from 'react-router-dom';
import { useCurrentPage } from '@/hooks/useCurrentPage';
import { BodyLayout } from '@/template/BodyLayout';
import { useBoardSelect } from '@/hooks/useBoardSelect';
import { Spacing } from '@/components/Spacing';
import { PetitionPostsTopLikedResponse } from '@/types/getPetitionTopLiked';
import { PetitionSubcategoriesType } from '../../type';
import { PetitionSubcategories } from '../../const';
import { PetitionPostContent } from '@/components/PostContent/PetitionPostContent';
import { PetitionPostSectionSkeleton } from './PetitionPostSectionSkeleton';
import { useRecoilValue } from 'recoil';
import { SearchState } from '@/recoil/atoms/atom';
import { useEffect } from 'react';
import { useGetBoardPostSearch } from '@/hooks/useGetBoardPostSearch';
import { useQueryClient } from '@tanstack/react-query';

export function PetitionPostSection() {
  const navigate = useNavigate();
  const { currentPage, handlePageChange } = useCurrentPage(1);
  const searchKeyword = useRecoilValue(SearchState);

  const { selectedSubcategories, onSubcategorySelect } = useBoardSelect<PetitionSubcategoriesType>(
    PetitionSubcategories[0]
  );

  const queryClient = useQueryClient();
  const { isFetching, isLoading, data, refetch } = useGetBoardPostSearch<PetitionPostsTopLikedResponse>({
    page: currentPage - 1,
    take: 9,
    boardCode: '청원게시판',
    q: searchKeyword,
  });

  useEffect(() => {
    if (!queryClient.getQueryData(['get-board-boardCode-posts-search'])) {
      refetch();
    }
  }, [searchKeyword, refetch]);

  const filteredData =
    selectedSubcategories === '전체'
      ? data?.data.postListResDto
      : data?.data.postListResDto.filter((item) => item.onGoingStatus === selectedSubcategories);

  const handleWriteBtnClick = () => {
    if (localStorage.getItem('kakaoData')) {
      navigate('/petition-notice/edit');
    } else {
      window.alert('청원 글 작성은 로그인 후 이용이 가능합니다!');
      navigate('/register');
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
    <>
      {isFetching && isLoading ? (
        <PetitionPostSectionSkeleton />
      ) : (
        <BodyLayout
          title={isFetching && isLoading ? '' : '청원글'}
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
          {data?.data && data.data.postListResDto.length > 0 ? (
            <>
              {' '}
              <Spacing size={40} direction="vertical"></Spacing>
              {filteredData &&
                filteredData.map((data) => (
                  <PetitionPostContent data={data} key={data.postId} onClick={handlePostDetail} />
                ))}
            </>
          ) : (
            <div className="py-[250px] text-center text-lg font-normal text-gray-600 xs:text-xs">
              등록된 게시물이 없습니다.
            </div>
          )}
        </BodyLayout>
      )}
    </>
  );
}
