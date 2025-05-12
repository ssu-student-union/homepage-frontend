import { BodyLayout } from '@/template/BodyLayout';
import { HeadLayout } from '@/template/HeadLayout';
import { BoardSelector } from '../../deprecated/Board/BoardSelector';
import { PostContent } from '../../PostContent';
import { SetURLSearchParams } from 'react-router';
import { useConditionalNavigate } from '@/hooks/useConditionalNavigate';
import { useEffect } from 'react';

interface PostBase {
  postId: number;
  date: Date;
  title: string;
}

type SelectorCategory<T> = T extends T ? '전체' | T : never;

interface BoardListProps<T extends string, P extends PostBase> {
  boardType: string; // 일단 string으로 두긴 했는데 유니온 타임으로 하는게 더 적합할려나요?
  subtitle: JSX.Element;

  totalPages: number;
  currentPage: number;
  authorityList?: string[];
  toWritepath: string;

  category: SelectorCategory<T>;
  subcategories: SelectorCategory<T>[];
  categoryColors: Record<string, string>;
  setSearchParams: SetURLSearchParams;
  page: number;

  posts: P[];
  getCategory: (post: P) => T;
  getAuthor: (post: P) => string;
  getPostUrl: (post: P) => string;
}

/**
 * 게시판 리스트 조회 페이지에서 공통적으로 사용하는 UI의 기능을 위한 함수와 레이아웃을 공통 컴포넌트로 묶었습니다.
 * 리스트 조회 페이지는 데이터, 게시판 이름 등을 제외하고 기능은 모든 부분에서 동일하게 작동하기에 기능까지 한꺼번에 묶었습니다.
 *
 * @template T - 게시판 카테고리 타입 (예: '접수대기' | '접수완료')
 * @template P - 게시글 데이터 타입 (반드시 postId, date, title 필드를 포함해야 함)
 *
 * @param {string} boardType - 게시판 종류 식별자 (예: 'human-rights', 'qna')
 * @param {JSX.Element} subtitle - 헤더 아래에 표시될 서브타이틀 요소
 * @param {number} totalPages - 전체 페이지 수
 * @param {number} currentPage - 현재 페이지 번호 (1-based)
 * @param {string[]} [authorityList] - 사용자 권한 목록 (선택적)
 * @param {string} toWritepath - 글 작성 페이지 경로 (예: '/human-rights/edit')
 * @param {SelectorCategory<T>} category - 현재 선택된 카테고리
 * @param {SelectorCategory<T>[]} subcategories - 표시할 서브카테고리 목록 (['전체', ...] 형태)
 * @param {Record<string, string>} categoryColors - 카테고리별 CSS 클래스 매핑 객체
 * @param {SetURLSearchParams} setSearchParams - URL 검색 파라미터 설정 함수
 * @param {number} page - 현재 URL의 page 파라미터 값
 * @param {P[]} posts - 표시할 게시글 데이터 배열
 * @param {(post: P) => T} getCategory - 게시글에서 카테고리 추출 함수
 * @param {(post: P) => string} getAuthor - 게시글에서 작성자 정보 추출 함수
 * @param {(post: P) => string} getPostUrl - 게시글에서 url 가지고 오기
 *
 * @example
 * <BoardList
 *   boardType="human-rights"
 *   subtitle={<span>서브타이틀</span>}
 *   totalPages={5}
 *   currentPage={1}
 *   // ... 기타 props
 * />
 */
export function BoardList<T extends string, P extends PostBase>({
  boardType,
  subtitle,
  totalPages,
  currentPage,
  authorityList,
  toWritepath,
  category,
  subcategories,
  categoryColors,
  setSearchParams,
  page,
  posts,
  getCategory,
  getAuthor,
  getPostUrl,
}: BoardListProps<T, P>) {
  const { handleNavigate } = useConditionalNavigate();

  useEffect(() => {
    if (totalPages === 0) return; // 데이터가 없는 경우 early return

    const isValidPage = page >= 1 && page <= totalPages;
    if (!isValidPage) {
      setSearchParams((prev) => {
        prev.delete('page');
        return prev;
      });
    }
  }, [page, totalPages, setSearchParams]);

  function selectCategory(category: SelectorCategory<T>) {
    setSearchParams((prev) => {
      if (category === '전체') {
        prev.delete('category');
      } else {
        prev.set('category', category);
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

  return (
    <>
      <HeadLayout title={boardType} subtitle={subtitle}></HeadLayout>
      <BodyLayout
        totalPages={totalPages}
        currentPage={currentPage + 1}
        authority={authorityList}
        onPageChange={navigatePage}
        onWriteClick={() => handleNavigate(toWritepath)}
      >
        <BoardSelector
          subcategories={subcategories}
          selectedSubcategory={category}
          onSubcategorySelect={selectCategory}
          className="mb-4"
        />
        {posts.map((post) => (
          <PostContent<T>
            key={post.postId}
            to={getPostUrl(post)}
            category={{ name: getCategory(post), className: categoryColors[getCategory(post)] }}
            date={post.date}
            title={post.title}
            author={getAuthor(post)}
          />
        ))}
        {posts.length === 0 && (
          <article className="flex items-center justify-center py-12">등록된 게시글이 없습니다.</article>
        )}
      </BodyLayout>
    </>
  );
}
