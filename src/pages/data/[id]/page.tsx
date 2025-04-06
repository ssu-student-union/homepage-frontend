import { PostBody } from '@/components/detail/PostBody';
import { PostFooter } from '@/components/detail/PostFooter';
import { PostHeader } from '@/components/detail/PostHeader';
import { Container } from '@/containers/new/Container';
import { breadcrumbItems } from '@/pages/data/const/data';
import { useDeleteDataPost, useGetDataPost } from '@/pages/data/queries';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router';

function PageSkeleton() {
  return (
    <article className="mb-20 mt-[120px]">
      <PostHeader.Skeleton />
      <hr className="bg-[#E7E7E7]" />
      <Container.Skeleton />
      <PostFooter.Skeleton />
    </article>
  );
}

export default function DataDetailPage() {
  /* Router Props */
  const { id } = useParams<{ id: string }>();
  const postId = parseInt(id ?? '');
  const navigate = useNavigate();

  /* Load data by query */
  const queryClient = useQueryClient();
  const { data: post, isLoading, error, isError } = useGetDataPost({ postId, queryOptions: { retry: true } });

  /* Set up Mutations */
  const { mutate: deletePost, isPending: isDeletePostPending } = useDeleteDataPost();

  if (isLoading || isDeletePostPending) {
    return <PageSkeleton />;
  }

  if (isNaN(postId) || !post || isError) {
    console.log(error);
    // TODO: 오류 발생 시 세부정보 제공
    return (
      <div className="mt-[120px] flex items-center justify-center">
        <p>오류가 발생하였습니다. 관리자에게 문의하십시오.</p>
      </div>
    );
  }

  const editable = post.isAuthor || (post.allowedAuthorities ?? []).includes('EDIT');
  const deletable = post.isAuthor || (post.allowedAuthorities ?? []).includes('DELETE');

  /* Mutation handler */
  function handleDeletePost() {
    if (id && post) {
      deletePost(
        { postId: id, fileUrls: post.fileResponseList.map((file) => file.fileUrl) },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['searchPosts', 'data'] });
            navigate('/data');
          },
        }
      );
    }
  }

  return (
    <>
      <article className="mt-[120px]">
        <PostHeader
          title={post.title}
          authorName={post.authorName}
          createdAt={post.createdAt}
          breadcrumbItems={breadcrumbItems}
        />
        <hr className="bg-[#E7E7E7]" />
        <Container>
          <PostBody content={post.content} files={post.fileResponseList} />
        </Container>
        <PostFooter
          boardUrl="/data"
          editable={editable}
          deletable={deletable}
          editUrl={`/data/${postId}/edit`}
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
