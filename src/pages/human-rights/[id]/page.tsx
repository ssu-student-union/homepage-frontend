import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import {
  MockHumanRightsPerson,
  MockHumanRightsReporter,
  PostAcl,
  useMockGetHumanRightsBoardDetail,
  useMockGetHumanRightsPostComments,
} from '@/pages/human-rights/[id]/mockQueries.ts';
import { useEffect } from 'react';
import { PostHeader } from '@/pages/human-rights/[id]/containers/PostHeader.tsx';
import { Container } from '@/pages/human-rights/[id]/containers/Container.tsx';
import { Frontmatter } from '@/pages/human-rights/[id]/components/Frontmatter.tsx';
import { PostBody } from '@/pages/human-rights/[id]/components/PostBody.tsx';
import { PostFooter } from '@/pages/human-rights/[id]/containers/PostFooter.tsx';
import { PostCommentEditor } from '@/pages/human-rights/[id]/components/PostCommentEditor.tsx';
import { PostComment } from '@/pages/human-rights/[id]/components/PostComment.tsx';

const breadcrumbItems: [string, string | null][] = [
  ['소통', null],
  ['인권신고게시판', '/human-rights'],
];

function personToFrontmatter(person: MockHumanRightsPerson): [string, string][] {
  return [
    ['성명', person.name],
    ['학번', person.studentId],
    ['학과/부', person.department],
  ];
}

function reporterToFrontmatter(reporter: MockHumanRightsReporter): [string, string][] {
  return [...personToFrontmatter(reporter), ['연락처', reporter.contact]];
}

function ReporterFrontmatter({ reporter }: { reporter: MockHumanRightsReporter }) {
  return <Frontmatter title="신고자 정보" pairs={reporterToFrontmatter(reporter)} />;
}

function PersonFrontmatter({ title, person }: { title: string; person: MockHumanRightsPerson }) {
  return <Frontmatter title={title} pairs={personToFrontmatter(person)} />;
}

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

export function HumanRightsDetailPage() {
  /* Router Props */
  const { id } = useParams<{ id: string }>();
  const postId = parseInt(id ?? '');
  /* Load data by query */
  const queryClient = useQueryClient();
  const { data: postData, isLoading, isError, refetch } = useMockGetHumanRightsBoardDetail({ postId, delay: 10000 });
  const {
    data: commentsData,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
    refetch: commentsRefetch,
  } = useMockGetHumanRightsPostComments({ postId });

  useEffect(() => {
    if (!queryClient.getQueryData(['get-board-boardCode-posts-postId'])) {
      refetch();
    }
  }, [queryClient, refetch]);

  useEffect(() => {
    if (!queryClient.getQueryData(['get-board-boardCode-posts-postId'])) {
      commentsRefetch();
    }
  }, [queryClient, commentsRefetch]);

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (isNaN(postId) || !postData || isError || !commentsData || isCommentsError) {
    // TODO: 오류 발생 시 세부정보 제공
    return (
      <div className="mt-[120px] flex items-center justify-center">
        <p>오류가 발생하였습니다. 관리자에게 문의하십시오.</p>
      </div>
    );
  }

  /* Data Preparation */
  const post = postData.data;

  const comments = commentsData.data.postComments;
  const totalComments = commentsData.data.total;
  const commentAcl = commentsData.data.allowedAuthorities;

  const editable = post.isAuthor || post.allowedAuthorities.includes(PostAcl.EDIT);
  const deletable = post.isAuthor || post.allowedAuthorities.includes(PostAcl.DELETE);
  const commentable = post.isAuthor || commentAcl.includes(PostAcl.COMMENT);
  const comment_deletable = commentAcl.includes(PostAcl.DELETE_COMMENT);

  return (
    <>
      <article className="mt-[120px]">
        <PostHeader
          title={post.title}
          authorName={post.authorName}
          createdAt={new Date(post.createdAt)}
          breadcrumbItems={breadcrumbItems}
        />
        <hr className="bg-[#E7E7E7]" />
        <Container>
          <ReporterFrontmatter reporter={post.metadata.reporter} />
          {post.metadata.victims.map((victim, idx) => (
            <PersonFrontmatter key={`victims-${idx}`} title={`피침해자 ${idx + 1}`} person={victim} />
          ))}
          {post.metadata.invaders.map((invader, idx) => (
            <PersonFrontmatter key={`invaders-${idx}`} title={`침해자 ${idx + 1}`} person={invader} />
          ))}
          <PostBody content={post.content} files={post.fileResponseList} />
        </Container>
        <PostFooter
          boardUrl="/human-rights"
          editable={editable}
          deletable={deletable}
          editUrl={`/human-rights/edit/${postId}`}
          className="mb-20"
          onDelete={() => console.log('TODO: deleting post')}
        />
      </article>
      <hr className="bg-[#E7E7E7]" />
      <Container>
        {/* TODO: 댓글 로딩 중 스켈레톤 */}
        {!isCommentsLoading && (
          <div className="flex flex-col gap-6">
            <h1 className="mb-5 text-2xl font-bold">
              댓글 <span className="text-primary">{totalComments}</span>
            </h1>
            {commentable && (
              <PostCommentEditor
                className="mb-4"
                placeholder="댓글을 남겨보세요"
                maxLength={2000}
                onSubmit={(v) => console.log('TODO: submit comment', v)}
              />
            )}
            {comments.map((comment) => (
              <PostComment
                key={comment.id}
                author={comment.authorName}
                createdAt={new Date(comment.createdAt)}
                commentType={comment.commentType}
                lastEditedAt={comment.lastEditedAt === null ? undefined : new Date(comment.lastEditedAt)}
                editable={comment.isAuthor}
                deletable={comment.isAuthor || comment_deletable}
                deleted={comment.isDeleted}
                onDelete={() => console.log('TODO: delete comment')}
                onEdit={() => console.log('TODO: edit comment')}
              >
                {comment.content}
              </PostComment>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
