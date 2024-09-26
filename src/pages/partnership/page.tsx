import { HeadLayout } from '@/template/HeadLayout';
import { BodyLayout } from '@/template/BodyLayout';
import { PostCardBasic } from '@/components/PostCard/PostCardBasicMissing';
import { Spacing } from '@/components/Spacing';
import { useResize } from '@/hooks/useResize';
import { Size } from '@/components/PostCard/const/state';
import { BoardSelector } from '@/components/Board/BoardSelector';
import { PartnershipSubcategories } from './const';
import { useBoardSelect } from '@/hooks/useBoardSelect';
import { useEffect, useMemo, useState } from 'react';
import { PartnershipSubcategoriesType } from './type';
import { GetPartnershipBoardPostsResponse, PartnershipPostListResDto } from '@/types/getPartnershipBoardPosts';
import { useNavigate } from 'react-router-dom';
import { chunkArray } from './utils';
import { formatYYYYMMDD } from '@/utils/formatYYYYMMDD';
import { useRecoilValue } from 'recoil';
import { SearchState } from '@/recoil/atoms/atom';
import { useGetBoardPostSearch } from '@/hooks/useGetBoardPostSearch';
import { useQueryClient } from '@tanstack/react-query';

export function PartnershipPage() {
  const { width } = useResize();
  const navigate = useNavigate();
  const searchQuery = useRecoilValue(SearchState);

  const { selectedSubcategories, onSubcategorySelect } = useBoardSelect<PartnershipSubcategoriesType>(
    PartnershipSubcategories[0]
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTake, setCurrentTake] = useState(9);

  const queryClient = useQueryClient();
  const { data, isLoading, refetch } = useGetBoardPostSearch<GetPartnershipBoardPostsResponse>({
    page: currentPage - 1,
    take: currentTake,
    category: selectedSubcategories === '전체' ? undefined : selectedSubcategories,
    boardCode: '제휴게시판',
    q: searchQuery,
  });

  useEffect(() => {
    if (!queryClient.getQueryData(['get-board-boardCode-posts-search'])) {
      refetch();
    }
  }, [queryClient, refetch]);

  const posts = data?.data.postListResDto || []; // 게시물 리스트
  const partnershipCount = useMemo(() => {
    if (isLoading) {
      return 0;
    }
    return data?.data.pageInfo.totalElements;
  }, [data?.data.pageInfo.totalElements, isLoading]);

  useEffect(() => {
    if (width < 1440) {
      setCurrentTake(5);
      refetch();
    } else if (width >= 1440 && width < 1920) {
      setCurrentTake(6);
      refetch();
    } else if (width >= 1920) {
      setCurrentTake(9);
      refetch();
    }
    refetch();
  }, [width, refetch]);

  const renderPostCardBasic = (items: PartnershipPostListResDto[], size: Size) => (
    <section className="flex h-fit w-full flex-col justify-between">
      {items.map((item, index) => (
        <div key={item.postId}>
          <PostCardBasic
            title={`[${item.category}] ${item.title}`}
            subtitle={item.content}
            date={formatYYYYMMDD(item.date)}
            imgUrl={item.thumbNail}
            size={size}
            onClick={() => {
              if (data?.data.deniedAuthorities.includes('READ')) {
                const check = window.confirm('제휴 안내는 로그인된 사용자만 볼 수 있습니다. 로그인 하시겠습니까?');
                if (check) {
                  navigate('/register');
                } else {
                  return;
                }
              } else {
                navigate(`/partnership/${item.postId}`, { state: { postId: item.postId } });
              }
            }}
          />
          {index < items.length - 1 && <Spacing size={20} direction="vertical" />}
        </div>
      ))}
    </section>
  );

  const renderChunkedPostCards = (chunkSize: number) =>
    chunkArray<PartnershipPostListResDto>(posts, chunkSize)?.map((items, chunkIndex) => (
      <div key={`chunk-${chunkIndex}`} className="flex h-fit w-full justify-between">
        {items.map((item) => (
          <PostCardBasic
            key={item.postId}
            title={`[${item.category}] ${item.title}`}
            subtitle={item.content}
            date={formatYYYYMMDD(item.date)}
            profileName={'US:SUM'}
            imgUrl={item.thumbNail}
            onClick={() => {
              if (data?.data.deniedAuthorities.includes('READ')) {
                const check = window.confirm('제휴 안내는 로그인된 사용자만 볼 수 있습니다. 로그인 하시겠습니까?');
                if (check) {
                  navigate('/register');
                } else {
                  return;
                }
              } else {
                navigate(`/partnership/${item.postId}`, { state: { postId: item.postId } });
              }
            }}
          />
        ))}
      </div>
    ));

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
        totalPages={data?.data.pageInfo.totalPages ?? 1}
        currentPage={currentPage}
        onPageChange={(number) => {
          setCurrentPage(number);
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

        {posts.length === 0 ? (
          <div className="flex h-[32rem] w-full items-center justify-center text-gray-600">
            등록된 게시물이 없습니다
          </div>
        ) : (
          <>
            {/* xs */}
            {width < 720 && renderPostCardBasic(posts, Size.small)}

            {/* sm, md, lg */}
            {width >= 720 && width < 1440 && renderPostCardBasic(posts, Size.medium)}

            {/* xl */}
            {width >= 1440 && width < 1920 && (
              <section className="flex h-fit w-full flex-col justify-between gap-[40px]">
                {renderChunkedPostCards(2)}
              </section>
            )}

            {/* xxl */}
            {width >= 1920 && (
              <section className="flex h-fit w-full flex-col justify-between gap-[40px]">
                {renderChunkedPostCards(3)}
              </section>
            )}
          </>
        )}
      </BodyLayout>
    </>
  );
}
