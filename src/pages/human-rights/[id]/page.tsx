import { useNavigate, useParams } from 'react-router';
import { PostHeader } from '@/components/detail/PostHeader';
import { Frontmatter } from '@/pages/human-rights/[id]/components/Frontmatter.tsx';
import { PostBody } from '@/components/detail/PostBody';
import { PostFooter } from '@/components/detail/PostFooter';
import { PostCommentEditor } from '@/components/detail/PostCommentEditor';
import { PostComment } from '@/components/detail/PostComment';
import {
  HumanRightsComment,
  HumanRightsCommentResponse,
  HumanRightsPerson,
  HumanRightsReporter,
} from '@/pages/human-rights/schema.ts';
import { Container } from '@/containers/new/Container.tsx';
import {
  useDeleteHumanRightsPost,
  useGetHumanRightsComments,
  useGetHumanRightsPost,
} from '@/pages/human-rights/queries.ts';
import { useCreateComment } from '@/hooks/new/mutations/useCreateComment.ts';
import { usePatchComment } from '@/hooks/new/mutations/usePatchComment.ts';
import { useDeleteComment } from '@/hooks/new/mutations/useDeleteComment.ts';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

const BOARD_CODE = '인권신고게시판' as const;

const breadcrumbItems: [string, string | null][] = [
  ['소통', null],
  [BOARD_CODE, '/human-rights'],
];

function personToFrontmatter(person: HumanRightsPerson): [string, string][] {
  return [
    ['성명', person.name],
    ['학번', person.studentId],
    ['학과/부', person.major],
  ];
}

function reporterToFrontmatter(reporter: HumanRightsReporter): [string, string][] {
  return [...personToFrontmatter(reporter), ['연락처', reporter.phoneNumber]];
}

function ReporterFrontmatter({ reporter }: { reporter: HumanRightsReporter }) {
  return <Frontmatter title="신고자 정보" pairs={reporterToFrontmatter(reporter)} />;
}

function PersonFrontmatter({ title, person }: { title: string; person: HumanRightsPerson }) {
  return <Frontmatter title={title} pairs={personToFrontmatter(person)} />;
}

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

export function HumanRightsDetailPage() {
  /* Router Props */
  const { id } = useParams<{ id: string }>();
  const postId = parseInt(id ?? '');
  const navigate = useNavigate();

  /* Load data by query */
  const queryClient = useQueryClient();
  const { data: post, isLoading, error, isError } = useGetHumanRightsPost({ postId, queryOptions: { retry: true } });
  const {
    data: comments,
    isLoading: isCommentsLoading,
    error: commentsError,
    isError: isCommentsError,
  } = useGetHumanRightsComments({ postId, type: '최신순', queryOptions: { retry: true } });

  /* Set up Mutations */
  const { mutate: deletePost, isPending: isDeletePostPending } = useDeleteHumanRightsPost();
  const { mutate: submitComment, isPending: isSubmitCommentPending } = useCreateComment<HumanRightsCommentResponse>({
    postId,
  });
  const { mutate: patchComment, isPending: isPatchCommentPending } = usePatchComment();
  const { mutate: deleteComment, isPending: isDeleteCommentPending } = useDeleteComment();

  /* State to check updating comments */
  const [lastUpdatedComment, setLastUpdatedComment] = useState<number | null>(null);

  if (isLoading || isDeletePostPending || isCommentsLoading) {
    return <PageSkeleton />;
  }

  if (isNaN(postId) || !post || isError || !comments || isCommentsError) {
    console.log(error, commentsError);
    // TODO: 오류 발생 시 세부정보 제공
    return (
      <div className="mt-16 flex items-center justify-center">
        <p>오류가 발생하였습니다. 관리자에게 문의하십시오.</p>
      </div>
    );
  }

  /* Data Preparation */
  const reporter = post.rightsDetailList.find((person) => person.personType === 'REPORTER') as
    | HumanRightsReporter
    | undefined;
  const victims = post.rightsDetailList.filter((person) => person.personType === 'VICTIM');
  const attackers = post.rightsDetailList.filter((person) => person.personType === 'ATTACKER');

  const fullComments: HumanRightsComment[] = [...post.officialCommentList.reverse(), ...comments.postComments];
  const totalComments = comments.total + post.officialCommentList.length;
  const commentAcl = comments.allowedAuthorities;

  const editable = post.isAuthor || post.allowedAuthorities.includes('EDIT');
  const deletable = post.isAuthor || post.allowedAuthorities.includes('DELETE');
  const commentable = post.isAuthor || commentAcl.includes('COMMENT');
  const commentDeletable = commentAcl.includes('DELETE_COMMENT');

  /* Mutation handler */
  function handleDeletePost() {
    if (post) {
      deletePost(
        { postId: `${postId}`, fileUrls: post.postFileList.map((file) => file.fileUrl) },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['searchPosts', BOARD_CODE] });
            navigate('/human-rights');
          },
        }
      );
    }
  }

  function handleSubmitComment(content: string) {
    submitComment(
      { content },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: ['getComments', postId],
          });
          await queryClient.invalidateQueries({
            queryKey: ['getPost', BOARD_CODE, postId],
          });
        },
      }
    );
  }

  function handleDeleteComment(commentId: number) {
    setLastUpdatedComment(commentId);
    deleteComment(
      { commentId },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ['getComments', postId] });
          await queryClient.invalidateQueries({
            queryKey: ['getPost', BOARD_CODE, postId],
          });
        },
      }
    );
  }

  function handlePatchComment(commentId: number, content: string) {
    setLastUpdatedComment(commentId);
    patchComment(
      { commentId, content },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ['getComments', postId] });
          await queryClient.invalidateQueries({
            queryKey: ['getPost', BOARD_CODE, postId],
          });
        },
      }
    );
  }

  return (
    <>
      <article className="mt-16">
        <PostHeader
          title={post.title}
          authorName={post.authorName}
          createdAt={post.createdAt}
          breadcrumbItems={breadcrumbItems}
        />
        <hr className="bg-[#E7E7E7]" />
        <Container>
          {reporter && <ReporterFrontmatter reporter={reporter} />}
          {victims.map((victim, idx) => (
            <PersonFrontmatter key={`victims-${idx}`} title={`피침해자 ${idx + 1}`} person={victim} />
          ))}
          {attackers.map((attacker, idx) => (
            <PersonFrontmatter key={`attackers-${idx}`} title={`침해자 ${idx + 1}`} person={attacker} />
          ))}
          <PostBody content={post.content} files={post.postFileList} />
        </Container>
        <PostFooter
          boardUrl="/human-rights"
          editable={editable}
          deletable={deletable}
          editUrl={`/human-rights/${postId}/edit`}
          className="mb-20"
          onDelete={handleDeletePost}
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
                onSubmit={handleSubmitComment}
                uploading={isSubmitCommentPending}
              />
            )}
            {[...fullComments].map((comment) => {
              if ((lastUpdatedComment ?? -1) === comment.id && (isPatchCommentPending || isDeleteCommentPending)) {
                return <PostComment.Skeleton key={comment.id} />;
              }
              return (
                <PostComment
                  key={comment.id}
                  author={comment.authorName}
                  createdAt={comment.createdAt}
                  commentType={comment.commentType}
                  lastEditedAt={comment.lastEditedAt ?? undefined}
                  editable={comment.isAuthor}
                  deletable={comment.commentType !== 'OFFICIAL' && (comment.isAuthor || commentDeletable)}
                  deleted={comment.isDeleted ?? false}
                  onDelete={() => handleDeleteComment(comment.id)}
                  onEdit={(content) => handlePatchComment(comment.id, content)}
                >
                  {comment.content}
                </PostComment>
              );
            })}
          </div>
        )}
      </Container>
    </>
  );
}
