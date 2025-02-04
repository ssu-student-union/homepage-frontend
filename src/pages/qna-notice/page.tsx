import { HeadLayout } from '@/template/HeadLayout';
import { BodyLayout } from '@/template/BodyLayout';
import { BoardSelector } from '@/components/Board/BoardSelector';
import { PostContent } from '@/components/PostContent/PostContent';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getQnaList, QnaPostParams, QnaTarget } from './hooks/getQnaList';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { QnaListData } from './types';
import { SearchState } from '@/recoil/atoms/atom';

/* 빠르게 질의응답게시판 구현을 위해 해당 페이지에서 직접 데이터 페칭을 합니다. 이후에 리팩토링 예정이니 이해 부탁드려요ㅠ */

const answerColors: { [target: string]: string } = {
  답변대기: 'text-gray-500',
  답변완료: 'text-primary',
} as const;

function convertToDateOnly(dateString: string): Date {
  const [datePart] = dateString.split(' ');
  const [year, month, day] = datePart.split('/').map(Number);
  return new Date(year, month - 1, day);
}

const ensureTarget = (str: string | null) => {
  if (str === '단과질문' || str === '학과질문') return str;
  return '전체';
};

const conversionTarget = (str: string) => {
  if (str === '단과질문') return 'COLLEGE';
  if (str === '학과질문') return 'DEPARTMENT';
  return 'ALL';
};

const subtitle = (
  <p className="font-bold">
    질문을 등록하면 <span className="text-primary">24시간 내에 학생회</span>가 답변합니다
  </p>
);

function PageSkeleton() {
  return (
    <>
      <HeadLayout title="질의응답게시판" subtitle={subtitle} searchHidden={true} />
      <BodyLayout.Skeleton>
        <BoardSelector.Skeleton />
        {Array.from(Array(10).keys()).map((_, i) => (
          <PostContent.Skeleton key={i} />
        ))}
      </BodyLayout.Skeleton>
    </>
  );
}

function qnaPostsList(page: number, qnaTarget: QnaTarget, q?: string) {
  const queryParams: QnaPostParams = { page: page - 1, take: 14, qnaTarget, q };

  return useQuery<QnaListData, Error>({
    queryKey: ['qnaPostsList', queryParams],
    queryFn: async () => {
      const response = await getQnaList(queryParams);
      return response.data.data;
    },
  });
}

export function QnApage() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') ?? '1') || 1;
  const target = ensureTarget(searchParams.get('target'));
  const [q] = useRecoilState(SearchState);

  console.log('q', q);
  // page와 category가 변경될 때마다 그에 맞는 데이터를 불러와 뿌려준다
  const { data, isLoading, isError, error } = qnaPostsList(page, conversionTarget(target), q);

  useEffect(() => {
    if (data && (page < 1 || page > data.pageInfo.totalPages)) {
      setSearchParams((prev) => {
        prev.delete('page');
        return prev;
      });
    }
  }, [data, page, setSearchParams]);

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (!data || isError) {
    console.log(error);
    return (
      <div className="mt-[120px] flex items-center justify-center">
        <p>오류가 발생하였습니다. 관리자에게 문의하십시오.</p>
      </div>
    );
  }

  function selectTarget(target: string) {
    setSearchParams((prev) => {
      if (target === '전체') {
        prev.delete('target');
      } else {
        prev.set('target', target);
      }
      prev.delete('page');
      return prev;
    });
    window.scrollTo(0, 0);
  }

  function navigatePage(page: number) {
    setSearchParams((prev) => {
      prev.set('page', `${page}`);
      return prev;
    });
    window.scrollTo(0, 0);
  }

  function navigateToWrite() {
    navigate('/qna/edit');
  }

  return (
    <>
      <HeadLayout title="질의응답게시판" subtitle={subtitle} />
      <BodyLayout
        totalPages={data.pageInfo.totalPages}
        currentPage={data.pageInfo.pageNum + 1}
        authority={data.allowedAuthorities}
        onPageChange={navigatePage}
        onWriteClick={navigateToWrite}
      >
        <BoardSelector
          subcategories={['전체', '단과질문', '학과질문']}
          selectedSubcategory={target}
          onSubcategorySelect={selectTarget}
          className="mb-4"
        />
        {data.postListResDto.map((post) => (
          <PostContent
            key={post.postId}
            to={`/qna/${post.postId}`}
            category={{ name: post.category, className: answerColors[post.category] }}
            date={convertToDateOnly(post.date)}
            title={post.title}
            author={post.department}
          />
        ))}
        {data.postListResDto.length === 0 && (
          <article className="flex items-center justify-center py-12">등록된 게시글이 없습니다.</article>
        )}
      </BodyLayout>
    </>
  );
}
