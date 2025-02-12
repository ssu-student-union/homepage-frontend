import { PostBody } from '@/components/BoardNew/detail/PostBody';
import { PostFooter } from '@/components/BoardNew/detail/PostFooter';
import { PostHeader } from '@/components/BoardNew/detail/PostHeader';
import { Container } from '@/containers/new/Container';
import { breadcrumbItems } from '@/pages/data/[id]/const/mockupData';
import { useGetDataPost } from '@/pages/data/queries';
import { useNavigate, useParams } from 'react-router-dom';

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

  const { data: post, isLoading, error, isError } = useGetDataPost({ postId, queryOptions: { retry: true } });

  if (isLoading) {
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
          <PostBody.Data content={post.content} files={post.fileResponseList} />
        </Container>
        <PostFooter
          boardUrl="/data"
          editable={editable}
          deletable={deletable}
          editUrl={`/data/${postId}/edit`}
          className="mb-20"
          onDelete={() => {
            navigate('/data');
          }}
        />
      </article>
      <hr className="bg-[#E7E7E7]" />
    </>
  );
}
