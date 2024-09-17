import { HeadLayout } from '@/template/HeadLayout';
import { BodyLayout } from '@/template/BodyLayout';
import { PostCardBasic } from '@/components/PostCard/PostCardBasicMissing';
import { Spacing } from '@/components/Spacing';
import { useResize } from '@/hooks/useResize';
import { Size } from '@/components/PostCard/const/state';
import { BoardSelector } from '@/components/Board/BoardSelector';
import { PartnershipSubcategories } from './const';
import { useBoardSelect } from '@/hooks/useBoardSelect';
import { useGetBoardPosts } from '@/hooks/useGetBoardPosts';
import { useEffect, useMemo, useState } from 'react';
import { PartnershipSubcategoriesType } from './type';
import { GetPartnershipBoardPostsResponse, PartnershipPostListResDto } from '@/types/getPartnershipBoardPosts';
import { useNavigate } from 'react-router-dom';
import { chunkArray } from './utils';
import { formatYYYYMMDD } from '@/utils/formatYYYYMMDD';

export function PartnershipPage() {
  const { width } = useResize();
  const navigate = useNavigate();

  const { selectedSubcategories, onSubcategorySelect } = useBoardSelect<PartnershipSubcategoriesType>(
    PartnershipSubcategories[0]
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTake, setCurrentTake] = useState(9);

  const { data, isLoading } = useGetBoardPosts<GetPartnershipBoardPostsResponse>({
    page: currentPage - 1,
    take: currentTake,
    category: selectedSubcategories === '전체' ? undefined : selectedSubcategories,
    boardCode: '제휴게시판',
  });

  const partnershipCount = useMemo(() => {
    if (isLoading) {
      return 0;
    }
    return data?.data.pageInfo.totalElements;
  }, [data?.data.pageInfo.totalElements, isLoading]);

  useEffect(() => {
    if (width < 1440) {
      setCurrentTake(5);
    } else if (width >= 1440 && width < 1920) {
      setCurrentTake(6);
    } else if (width >= 1920) {
      setCurrentTake(9);
    }
  }, [width]);

  const renderPostCardBasic = (items: PartnershipPostListResDto[], size: Size) => (
    <section className="flex h-fit w-full flex-col justify-between">
      {items.map((item, index) => (
        <>
          <PostCardBasic
            key={item.postId}
            title={`[${item.category}] ${item.title}`}
            subtitle={item.content}
            date={formatYYYYMMDD(item.date)}
            imgUrl={item.thumbNail}
            size={size}
            onClick={() => {
              navigate(`/partnership/${item.postId}`, { state: { postId: item.postId } });
            }}
          />
          {index < items.length - 1 && <Spacing size={20} direction="vertical" />}
        </>
      ))}
    </section>
  );

  const renderChunkedPostCards = (chunkSize: number) =>
    chunkArray<PartnershipPostListResDto>(data?.data.postListResDto, chunkSize)?.map((items) => (
      <div className="flex h-fit w-full justify-between">
        {items.map((item) => (
          <PostCardBasic
            key={item.postId}
            title={`[${item.category}] ${item.title}`}
            subtitle={item.content}
            date={formatYYYYMMDD(item.date)}
            imgUrl={item.thumbNail}
            onClick={() => {
              navigate(`/partnership/${item.postId}`, { state: { postId: item.postId } });
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
      >
        <BoardSelector
          subcategories={PartnershipSubcategories}
          selectedSubcategory={selectedSubcategories}
          onSubcategorySelect={onSubcategorySelect}
        />
        <Spacing size={40} direction="vertical"></Spacing>

        {/* xs */}
        {width < 720 && renderPostCardBasic(data?.data.postListResDto || [], Size.small)}

        {/* sm, md, lg */}
        {width >= 720 && width < 1440 && renderPostCardBasic(data?.data.postListResDto || [], Size.medium)}

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
      </BodyLayout>
    </>
  );
}
