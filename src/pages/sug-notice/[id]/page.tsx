import { PostFooter } from '@/pages/human-rights/[id]/components/PostFooter';
import { PostHeader } from '@/pages/human-rights/[id]/components/PostHeader';
import { Container } from '@/pages/human-rights/containers/Container';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useDeleteSuggestPost, useGetSuggestComment, useGetSuggestPost } from '../queries';
import { SuggestComment, SuggestCommentResponse } from '../schema';
import { usePatchComment } from '@/pages/human-rights/hooks/mutations/usePatchComment';
import { useDeleteComment } from '@/pages/human-rights/hooks/mutations/useDeleteComment';
import { useCreateComment } from '@/pages/human-rights/hooks/mutations/useCreateComment';
import { useState } from 'react';
import { PostBody } from '@/pages/human-rights/[id]/components/PostBody';
import { PostCommentEditor } from '@/pages/human-rights/[id]/components/PostCommentEditor';
import { PostComment } from '@/pages/human-rights/[id]/components/PostComment';

const BOARD_CODE = '건의게시판' as const;
const breadcrumbItems: [string, string | null][] = [
  ['소통', null],
  [BOARD_CODE, '/sug-notice'],
];

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

export function SuggestDetailPage() {
  const { id } = useParams<{ id: string }>();
  const postId = parseInt(id ?? '');
  const navigte = useNavigate();

  const queryClient = useQueryClient();
  const { data: post, isLoading, error, isError } = useGetSuggestPost({ postId, queryOptions: { retry: true } });
  const {
    data: comments,
    isLoading: isCommentLoading,
    error: commentError,
    isError: isCommentError,
  } = useGetSuggestComment({ postId, type: '최신순', queryOptions: { retry: true } });

  const { mutate: deletePost, isPending: isDeletePostPending } = useDeleteSuggestPost();
  const { mutate: submitComment, isPending: isSubmitCommentPending } = useCreateComment<SuggestCommentResponse>({
    postId,
  });
  const { mutate: patchComment, isPending: isPatchCommentPending } = usePatchComment();
  const { mutate: deleteComment, isPending: isDeleteCommentPending } = useDeleteComment();

  const [lastUpdatedComment, setLastUpdatedComment] = useState<number | null>(null);

  if (isLoading || isDeletePostPending || isCommentLoading) {
    return <PageSkeleton />;
  }

  if (isNaN(postId) || !post || isError || !comments || isCommentError) {
    console.log(error, commentError);
    // TODO: 오류 발생 시 세부정보 제공
    return (
      <div className="mt-[120px] flex items-center justify-center">
        <p>오류가 발생하였습니다. 관리자에게 문의하십시오.</p>
      </div>
    );
  }

  const fullComments: SuggestComment[] = [...post.officialCommentList.reverse(), ...comments.postComments];
  const totalComments = comments.total + post.officialCommentList.length;
  const commentAcl = comments.allowedAuthorities;

  const editable = post.isAuthor || post.allowedAuthorities.includes('EDIT');
  const deletable = post.isAuthor || post.allowedAuthorities.includes('DELETE');
  const commentable = post.isAuthor || commentAcl.includes('COMMENT');
  const commentDeletable = commentAcl.includes('DELETE_COMMENT');

  function handleDeletePost() {
    if (post) {
      deletePost(
        { postId: `${postId}`, fileUrls: post.fileResponseList.map((file) => file.fileUrl) },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['searchPosts', BOARD_CODE] });
            navigte('/sug-notice');
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

  function handlePatchComment(commentId: number, content: string) {
    setLastUpdatedComment(commentId);
    patchComment(
      { commentId, content },
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
          boardUrl="/sug-notice"
          editable={editable}
          deletable={deletable}
          editUrl={`/sug-notice/${postId}/edit`}
          className="mb-20"
          onDelete={handleDeletePost}
        />
      </article>
      <hr className="bg-[#E7E7E7]" />
      <Container>
        {!isCommentLoading && (
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
