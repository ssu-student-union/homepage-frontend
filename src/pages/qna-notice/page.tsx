import { HeadLayout } from '@/template/HeadLayout';
import { BodyLayout } from '@/template/BodyLayout';
import { BoardSelector } from '@/components/deprecated/Board/BoardSelector';
import { PostContent } from '@/components/PostContent';
import { Link, useSearchParams } from 'react-router';
import { QnaPostParams, useGetQnaList } from './hooks/useGetQnaList';
import { useEffect, useState, useMemo } from 'react';
import { LoginState } from '@/atoms/atom';
import { Search } from '@/components/Search';
import { QnaMajorCode, QnaMemberCode } from './types';
import { SearchState } from '@/atoms/atom';
import { convertToDateOnly } from './utils/convertToDateOnly';
import { qnaMajorCodesData, qnaMemberCodeData } from './collegesData';
import { useGetUserInfoQna } from './hooks/useGetUserInfoQna';
import { useAtom } from 'jotai';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { BoardHeader } from '@/components/BoardHeader';
import { Pencil, SearchIcon } from 'lucide-react';
import { cn } from '@/libs/utils';
import { Container } from '@/containers/new/Container';
import { ArticleFooter } from '@/containers/new/ArticleFooter';
import { buttonVariants } from '@/components/ui/button';
import LinkPagination from '@/components/LinkPagination';

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
    질문을 등록하면 <span className="text-primary">72시간 내에 해당 단위 학생회</span>가 답변합니다
  </p>
);

function PageSkeleton() {
  return (
    <>
      <HeadLayout title="건의게시판" subtitle={subtitle} searchHidden={true} />
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
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') ?? '1') || 1;
  const target = ensureTarget(searchParams.get('target'));
  const [q] = useAtom(SearchState);

  const [filterOpen, setFilterOpen] = useState(false);

  // 페이지를 렌더링할 때 로그인을 했는지 확인하고 했을 경우 유저 데이터를 불러온다.
  const [isLogin] = useAtom(LoginState);

  const { data: user, isLoading: isUserLoading, isError: isUserError, error: userError } = useGetUserInfoQna(isLogin);

  // // 유저 데이터가 있다면 qnaMemberCode와 qnaMajorCode에 그 값을 추가해 준다.
  const qnaMemberCode: QnaMemberCode | '' = isLogin && user && user.memberCode !== '총학생회' ? user.memberCode : '';
  const qnaMajorCode: QnaMajorCode | '' = isLogin && user && user.majorCode ? user.majorCode : '';

  const queryParamsForList = buildQnaPostParams({
    page: page - 1,
    take: 14,
    q: q,
    target: target,
  });

  const { data, isLoading, isError, error } = useGetQnaList(queryParamsForList);

  const { totalPages } = useMemo(() => data?.pageInfo ?? { totalPages: 0 }, [data]);
  const authorities = useMemo(() => data?.allowedAuthorities ?? [], [data]);
  const writable = useMemo(() => authorities.includes('WRITE'), [authorities]);

  const handleSearch = (value: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev.toString());
      if (value) {
        newParams.set('q', value);
      } else {
        newParams.delete('q');
      }
      return newParams;
    });
  };

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
      <div className="mt-16 flex items-center justify-center">
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

  return (
    <Collapsible open={filterOpen} onOpenChange={setFilterOpen}>
      <BoardHeader title="건의게시판" className="border-b-neutral-200 max-md:px-5 md:border-b">
        <Search className="hidden md:flex" onSearch={handleSearch} />
        <CollapsibleTrigger className="md:hidden">
          <SearchIcon className={cn('size-4 transition-colors', filterOpen && 'text-primary')} />
        </CollapsibleTrigger>
      </BoardHeader>
      <Container className="pt-0 max-md:px-0 md:pt-14">
        <div className="flex flex-col gap-4">
          <CollapsibleContent
            className={cn(
              'transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down',
              'border-b border-b-border max-md:px-4 md:hidden'
            )}
          >
            <div className="flex flex-col gap-2 py-2">
              <Search className="h-12 xl:hidden [&_button]:hidden" onSearch={handleSearch} />
            </div>
          </CollapsibleContent>
          <BoardSelector
            subcategories={['전체', '총학생회', `${qnaMemberCode}`, `${qnaMajorCode}`].filter(Boolean)}
            selectedSubcategory={target}
            onSubcategorySelect={selectTarget}
            className="mb-4 max-md:px-4"
          />
          <div className="border-t-black md:border-t">
            {isLoading
              ? Array.from(Array(10).keys()).map((_, i) => <PostContent.Skeleton key={i} />)
              : data.postListResDto.map((post) => (
                  <PostContent
                    key={post.postId}
                    to={`/qna/${post.postId}`}
                    category={{ name: post.category, className: answerColors[post.category] }}
                    date={convertToDateOnly(post.date)}
                    title={post.title}
                    author={`${post.department} ${post.authorName}`}
                  />
                ))}
          </div>
          {data.postListResDto.length === 0 && (
            <article className="flex items-center justify-center py-12">등록된 게시글이 없습니다.</article>
          )}
        </div>
      </Container>
      <ArticleFooter className="mb-20">
        <div className="flex flex-col gap-9">
          <div className="grid grid-cols-3">
            <div></div>
            <div className="flex justify-center">
              <LinkPagination totalPages={totalPages} maxDisplay={7} page={page} />
            </div>
            <div className="flex justify-end">
              {writable && (
                <Link className={cn(buttonVariants({ variant: 'outline' }), 'gap-2')} to="/qna/edit">
                  <Pencil className="size-4" />
                  <p>글쓰기</p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </ArticleFooter>
    </Collapsible>
  );
}
