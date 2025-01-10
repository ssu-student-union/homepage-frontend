import { SearchPostsOptions, useSearchPosts } from '../human-rights/hooks/query/useSearchPosts';
import { GetPostOptions, useGetPost } from '../human-rights/hooks/query/useGetPost';
import { GetCommentsOptions, useGetComments } from '../human-rights/hooks/query/useGetComments';
import { useCreatePost, UseCreatePostOptions } from '../human-rights/hooks/mutations/useCreatePost';
import { useDeletePost, UseDeletePostOptions } from '../human-rights/hooks/mutations/useDeletePost';
import { usePatchPost, UsePatchPostOptions } from '../human-rights/hooks/mutations/usePatchPost';
import { useUploadFiles, UseUploadFilesOptions } from '../human-rights/hooks/mutations/useUploadFiles';
import { SugNoticePostSummaryResponse, SugNoticePostsSummary, SugNoticePostSummarySchema } from './schema';

const BOARD_CODE = '건의게시판' as const;

// GET
// /board/{boardCode}/posts/search
// 검색키워드를 활용한 게시판 별 게시물 리스트 조회 api
// 검색키워드를 활용하여 게시판 별 게시물 리스트 조회 시 필요한 데이터를 조회하는 api 입니다.
// 요청인자에 q는 검색키워드를 의미하여 필수 값은 아닙니다.
// 아래 설명은 게시판 별 게시물 리스트 조회와 동일합니다.
// q(검색 키워드)를 넣고 요청하지 않으면 아무런 값이 반환되지 않습니다.
// (totalElements는 0) 요청으로 boardCode 그리고
// queryParam 형식으로 ,
// groupCode(중앙기구, 단과대학생회),
// memberCode(중앙운영위원회),
// category(필터링),
// page(입력 안 할시 첫번째 페이지),
// take(몇개 가져올지) 값을 넣으면 됩니다.
// 공지사항게시판을 사용할때만
// groupCode, memberCode에 값을 넣어서 사용하시면 됩니다.
// 나머지 게시판 필터링은 category에 값을 넣고 사용하시면 됩니다.

export function useSearchSugNoticePosts({
  q,
  page,
  take,
  category,
  queryOptions,
}: Omit<SearchPostsOptions<SugNoticePostSummaryResponse, SugNoticePostsSummary>, 'boardCode' | 'zodSchema'>) {
  const zodSchema = SugNoticePostSummarySchema;
  return useSearchPosts({
    boardCode: BOARD_CODE,
    q,
    page,
    take,
    category,
    zodSchema,
    queryOptions,
  });
}
