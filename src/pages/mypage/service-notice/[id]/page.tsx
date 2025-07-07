import { useNavigate, useParams } from 'react-router';
import { ServiceNoticeDetailEditSection } from './container/serviceNoticeDetailEditSection';
import { PostHeader } from '@/components/detail/PostHeader';
import { Container } from '@/containers/new/Container';
import { PostFooter } from '@/components/detail/PostFooter';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteServiceNoticePost, useGetServiceNoticePost } from '../quaries';
import { PostBody } from '@/components/detail/PostBody';
import { BOARD_CODE } from '../const/data';

function PageSkeleton() {
  return (
    <article className="mb-20 mt-16">
      <PostHeader.Skeleton />
      <hr className="bg-[#E7E7E7]" />
      <Container.Skeleton />
      <PostFooter.Skeleton />
    </article>
  );
}

export function ServiceNoticeDetailPage() {
  const { id } = useParams();
  const postId = Number(id);
  const navigate = useNavigate();

  const boardCode: string = BOARD_CODE;

  const QueryClient = useQueryClient();
  const { data: post, isLoading, error, isError } = useGetServiceNoticePost({ postId, queryOptions: { retry: true } });
  const { mutate: deletePost, isPending: isDeletePostPending } = useDeleteServiceNoticePost();

  if (isLoading || isDeletePostPending) {
    return <PageSkeleton />;
  }

  if (isNaN(postId) || !post || isError) {
    console.log(error);
    // TODO: 오류 발생 시 세부정보 제공
    return (
      <div className="mt-16 flex items-center justify-center">
        <p>오류가 발생하였습니다. 관리자에게 문의하십시오.</p>
      </div>
    );
  }

  const editable = post.isAuthor || (post.allowedAuthorities ?? []).includes('EDIT');
  const deletable = post.isAuthor || (post.allowedAuthorities ?? []).includes('DELETE');

  function handleDeletePost() {
    if (id && post) {
      deletePost(
        { postId: id, fileUrls: post.fileResponseList.map((file) => file.fileUrl) },
        {
          onSuccess: async () => {
            //TODO: 게시판 목록 일반화 후 쿼리 키 수정
            await QueryClient.invalidateQueries({ queryKey: ['get-board-boardCode-posts', '서비스공지사항'] });
            navigate('/service-notice');
          },
        }
      );
    }
  }

  return (
    <>
      <article className="mt-16">
        <PostHeader
          title={post.title}
          authorName={post.authorName}
          createdAt={post.createdAt}
          breadcrumbItems={[[boardCode, null]]}
        />
        <hr className="bg-[#E7E7E7]" />
        <Container>
          <PostBody content={post.content} files={post.fileResponseList} />
        </Container>
        <ServiceNoticeDetailEditSection
          className="mb-20"
          editable={editable}
          deletable={deletable}
          postId={postId}
          postDetail={post}
          handleDelete={handleDeletePost}
        />
        <PostFooter
          boardUrl="/service-notice"
          editable={editable}
          deletable={deletable}
          editUrl={`/service-notice/${postId}/patch`}
          className="mb-20"
          onDelete={() => {
            handleDeletePost();
          }}
        />
      </article>
      <hr className="bg-[#E7E7E7]" />
    </>
  );
}
