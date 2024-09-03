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
      return 0; // 로딩 중일 때는 undefined를 반환하여 UI가 바뀌지 않도록 합니다.
    }
    return data?.data.pageInfo.totalElements; // 데이터가 로딩되면 새로운 데이터로 UI를 업데이트합니다.
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

  useEffect(() => {
    console.log(currentPage);
  }, [currentPage]);

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
          navigate('/homepage-frontend/partnership/edit');
        }}
      >
        <BoardSelector
          subcategories={PartnershipSubcategories}
          selectedSubcategory={selectedSubcategories}
          onSubcategorySelect={onSubcategorySelect}
        />
        <Spacing size={40} direction="vertical"></Spacing>
        {/* xs */}
        {width < 720 ? (
          <section className="flex h-fit w-full flex-col justify-between">
            {data?.data.postListResDto.map((item) => (
              <PostCardBasic
                key={item.postId}
                title={item.title}
                subtitle={item.content}
                date={item.date}
                imgUrl={item.thumbNail}
                onClick={() => {
                  navigate(`/homepage-frontend/partnership/${item.postId}`, { state: { postId: item.postId } });
                }}
                size={Size.small}
              ></PostCardBasic>
            ))}
          </section>
        ) : null}
        {/* sm, md, lg */}
        {width < 1440 && width >= 720 ? (
          <section className="flex h-fit w-full flex-col justify-between">
            {data?.data.postListResDto.map((item) => (
              <PostCardBasic
                key={item.postId}
                title={item.title}
                subtitle={item.content}
                date={item.date}
                imgUrl={item.thumbNail}
                size={Size.medium}
                onClick={() => {
                  navigate(`/homepage-frontend/partnership/${item.postId}`, { state: { postId: item.postId } });
                }}
              ></PostCardBasic>
            ))}
          </section>
        ) : null}
        {/* xl */}
        {width >= 1440 && width < 1920 ? (
          <section className="flex h-fit w-full flex-col justify-between gap-[40px]">
            {chunkArray<PartnershipPostListResDto>(data?.data.postListResDto, 2)?.map((items) => (
              <div className="flex h-fit w-full justify-between">
                {items.map((item) => (
                  <PostCardBasic
                    key={item.postId}
                    title={item.title}
                    subtitle={item.content}
                    date={item.date}
                    imgUrl={item.thumbNail}
                    onClick={() => {
                      navigate(`/homepage-frontend/partnership/${item.postId}`, { state: { postId: item.postId } });
                    }}
                  ></PostCardBasic>
                ))}
              </div>
            ))}
          </section>
        ) : null}
        {/* xxl */}
        {width >= 1920 ? (
          <section className="flex h-fit w-full flex-col justify-between gap-[40px]">
            {chunkArray<PartnershipPostListResDto>(data?.data.postListResDto, 3)?.map((items) => (
              <div className="flex h-fit w-full justify-between">
                {items.map((item) => (
                  <PostCardBasic
                    key={item.postId}
                    title={item.title}
                    subtitle={item.content}
                    date={item.date}
                    imgUrl={item.thumbNail}
                    onClick={() => {
                      navigate(`/homepage-frontend/partnership/${item.postId}`, { state: { postId: item.postId } });
                    }}
                  ></PostCardBasic>
                ))}
              </div>
            ))}
          </section>
        ) : null}
      </BodyLayout>
    </>
  );
}
