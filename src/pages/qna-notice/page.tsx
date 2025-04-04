import { HeadLayout } from '@/template/HeadLayout';
import { BodyLayout } from '@/template/BodyLayout';
import { BoardSelector } from '@/components/Board/BoardSelector';
import { PostContent } from '@/components/PostContent/PostContent';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { QnaPostParams, useGetQnaList } from './hooks/useGetQnaList';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { LoginState } from '@/recoil/atoms/atom';
import { QnaMajorCode, QnaMemberCode } from './types';
import { SearchState } from '@/recoil/atoms/atom';
import { convertToDateOnly } from './utils/convertToDateOnly';
import { qnaMajorCodesData, qnaMemberCodeData } from './collegesData';
import { useGetUserInfoQna } from './hooks/useGetUserInfoQna';

/* 빠르게 질의응답게시판 구현을 위해 해당 페이지에서 직접 데이터 페칭을 합니다. 이후에 리팩토링 예정이니 이해 부탁드려요ㅠ */

const answerColors: { [target: string]: string } = {
  답변대기: 'text-gray-500',
  답변완료: 'text-primary',
} as const;

const ensureTarget = (str: string | null) => {
  if (str) return str;
  return '전체';
};

interface BuildQnaPostParams extends QnaPostParams {
  target: string;
}

// 단과대와 학과 두가지 타임이 모두 오는 target에 대해서 target 값에 따라 맞는 타입을 지정해주기 위해 타입 가드 방식을 이용했습니다.
// 해당 방식이 맞는지 정확히는 모르겠네요ㅠㅠ 확인하시고 해당 내용에 대해 아시는 분이 있다면 리뷰 부탁드려요
const isQnaMember = (value: string): value is QnaMemberCode => {
  return qnaMemberCodeData.includes(value as QnaMemberCode);
};
const isQnaMajor = (value: string): value is QnaMajorCode => {
  return qnaMajorCodesData.includes(value as QnaMajorCode);
};

const buildQnaPostParams = (params: BuildQnaPostParams): QnaPostParams => {
  if (params.target === '총학생회') {
    params.qnaMemberCode = '총학생회';
    params.qnaMajorCode = '';
  } else if (isQnaMember(params.target)) {
    params.qnaMemberCode = params.target;
    params.qnaMajorCode = '';
  } else if (isQnaMajor(params.target)) {
    params.qnaMemberCode = '';
    params.qnaMajorCode = params.target;
  } else {
    params.qnaMemberCode = '';
    params.qnaMajorCode = '';
  }

  return params;
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

export function QnApage() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') ?? '1') || 1;
  const target = ensureTarget(searchParams.get('target'));
  const [q] = useRecoilState(SearchState);

  // 페이지를 렌더링할 때 로그인을 했는지 확인하고 했을 경우 유저 데이터를 불러온다.
  const isLogin = useRecoilValue(LoginState);

  const { data: user, isLoading: isUserLoading, isError: isUserError, error: userError } = useGetUserInfoQna(isLogin);

  // 유저 데이터가 있다면 qnaMemberCode와 qnaMajorCode에 그 값을 추가해 준다.
  const qnaMemberCode: QnaMemberCode | '' = isLogin && user && user.memberCode !== '총학생회' ? user.memberCode : '';
  const qnaMajorCode: QnaMajorCode | '' = isLogin && user && user.majorCode ? user.majorCode : '';

  const queryParamsForList = buildQnaPostParams({
    page: page - 1,
    take: 14,
    q: q,
    target: target,
  });

  const { data, isLoading, isError, error } = useGetQnaList(queryParamsForList);

  useEffect(() => {
    if (data && (page < 1 || page > data.pageInfo.totalPages)) {
      setSearchParams((prev) => {
        prev.delete('page');
        return prev;
      });
    }
  }, [data, page, setSearchParams]);

  if (isLoading || (isLogin && isUserLoading)) {
    return <PageSkeleton />;
  }

  if (!data || isError || (isLogin && (!user || isUserError))) {
    if (isError) console.log('list error', error);
    if (isUserError) console.log('user error', userError);
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
    alert('시범운영 기간이 종료되었습니다. 곧 오픈 예정이니 다음에 이용해주세요');

    // if (isLogin) {
    //   navigate('/qna/edit');
    // } else {
    //   navigate('/register');
    // }
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
          subcategories={[
            '전체',
            '총학생회',
            `${qnaMemberCode && qnaMemberCode}`,
            `${qnaMajorCode && qnaMajorCode}`,
          ].filter(Boolean)}
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
