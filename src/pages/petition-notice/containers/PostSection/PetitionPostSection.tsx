import { BoardSelector } from '@/components/deprecated/Board/BoardSelector';
import { useLocation, useNavigate } from 'react-router';
import { useCurrentPage } from '@/hooks/useCurrentPage';
import { BodyLayout } from '@/template/BodyLayout';
import { useBoardSelect } from '@/hooks/useBoardSelect';
import { Spacing } from '@/components/Spacing';
import { PetitionPostsTopLikedResponse } from '@/types/getPetitionTopLiked';
import { PetitionSubcategoriesType } from '../../type';
import { PetitionSubcategories } from '../../const';
import { PetitionPostContent } from '@/components/deprecated/PetitionPostContent/PetitionPostContent';
import { PetitionPostSectionSkeleton } from './PetitionPostSectionSkeleton';
import { useRecoilValue } from 'recoil';
import { SearchState } from '@/recoil/atoms/atom';
import { useEffect } from 'react';
import { useGetBoardPostSearch } from '@/hooks/api/get/useGetBoardPostSearch';
import { useQueryClient } from '@tanstack/react-query';

export function PetitionPostSection() {
  const navigate = useNavigate();
  const location = useLocation();
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
    if (location.state?.cleanupEditPost) {
      localStorage.removeItem('oldContent');
    }
  }, [location]);

  useEffect(() => {
    if (!queryClient.getQueryData(['get-board-boardCode-posts-search'])) {
      refetch();
    }
  }, [queryClient, refetch]);

  const filteredData =
    selectedSubcategories === '전체'
      ? data?.data.postListResDto
      : data?.data.postListResDto.filter((item) => item.onGoingStatus === selectedSubcategories);

  const handleWriteBtnClick = () => {
    if (localStorage.getItem('accessToken')) {
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
          totalPages={filteredData && filteredData?.length ? (data?.data.pageInfo.totalPages ?? 1) : 0}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onWriteClick={handleWriteBtnClick}
          authority={data?.data.allowedAuthorities}
        >
          <BoardSelector
            subcategories={PetitionSubcategories}
            selectedSubcategory={selectedSubcategories}
            onSubcategorySelect={handleSubcategorySelect}
          />
          {filteredData && filteredData.length > 0 ? (
            <>
              {' '}
              <Spacing size={40} direction="vertical"></Spacing>
              {filteredData &&
                filteredData.map((data) => (
                  <PetitionPostContent data={data} key={data.postId} onClick={handlePostDetail} />
                ))}
            </>
          ) : (
            <div className="py-[250px] text-center text-xs font-normal text-gray-600 sm:text-lg">
              등록된 게시물이 없습니다.
            </div>
          )}
        </BodyLayout>
      )}
    </>
  );
}
