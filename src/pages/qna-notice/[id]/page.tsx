import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { PostHeader } from '@/components/detail/PostHeader';
import { Container } from '@/containers/new/Container';
import { PostFooter } from '@/components/detail/PostFooter';
import { ContentViewer } from '@/components/detail/ContentViewer';
import { PostComment } from '@/components/detail/PostComment';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteComment } from '@/hooks/new/mutations/useDeleteComment';
import { QnaComment } from './types';
import { PostCommentEditor } from '@/components/detail/PostCommentEditor';
import { useCreateComment } from '@/hooks/new/mutations/useCreateComment';
import { convertToDate } from '../utils/convertToDateOnly';
import { useDeleteQnaDetail } from '../hooks/useDeleteQnaDetail';
import { useGetQnaDetail } from '../hooks/useGetQnaDetail';
import { useCreateQnaReply } from '../hooks/useCreateQnaReplyComment';
import { useDeleteQnaReply } from '../hooks/useDeleteQnaReplyComment';
import { usePatchComment } from '@/hooks/new/mutations/usePatchComment';
import { useGetComments } from '@/hooks/new/query/useGetComments';

const boardCode = '질의응답게시판';

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

export default function QnaDetailPage() {
  const { id } = useParams<{ id: string }>();
  const postId = parseInt(id ?? '');
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [lastUpdatedComment, setLastUpdatedComment] = useState<number | null>(null);
  const [lastUpdatedReply, setLastUpdatedReply] = useState<number | null>(null);
  const [replyEditorOpenFor, setReplyEditorOpenFor] = useState<number | null>(null);

  if (!postId) {
    alert('잘못된 경로입니다. (게시글에 대한 id가 없습니다.)');
    navigate('/');
  }

  // 상세 게시글 조회 & 댓글 조회
  const { data, isLoading, isError, error } = useGetQnaDetail({ postId });

  const {
    data: comments,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
    error: commentsError,
  } = useGetComments<QnaComment>({ postId, type: '최신순', queryOptions: { refetchOnMount: 'always', staleTime: 0 } });

  // 게시글 삭제
  const { mutate: deleteDetail, isPending: isDeleteDetailPending } = useDeleteQnaDetail();
  function handleDeleteDetail() {
    if (data) {
      deleteDetail(
        { postId: `${postId}`, fileUrls: [] },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['qnaPostsList'] });
            navigate('/qna');
          },
        }
      );
    }
  }

  // 댓글 작성
  const { mutate: submitComment, isPending: isSubmitCommentPending } = useCreateComment<QnaComment>({ postId });
  function handleSubmitComment(content: string) {
    submitComment(
      { content },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: ['getComments', postId],
          });
          await queryClient.invalidateQueries({
            queryKey: ['getPost', boardCode, postId],
          });
        },
      }
    );
  }

  // 댓글 수정
  const { mutate: patchComment, isPending: isPatchCommentPending } = usePatchComment();
  function handlePatchComment(commentId: number, content: string) {
    setLastUpdatedComment(commentId);
    patchComment(
      { commentId, content },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['getComments', postId],
          });
          queryClient.invalidateQueries({
            queryKey: ['getPost', boardCode, postId],
          });
        },
      }
    );
  }

  // 댓글 삭제
  const { mutate: deleteComment, isPending: isDeleteCommentPending } = useDeleteComment();
  function handleDeleteComment(commentId: number) {
    setLastUpdatedComment(commentId);
    deleteComment(
      { commentId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['getComments', postId] });
          queryClient.invalidateQueries({ queryKey: ['getPost', boardCode, postId] });
        },
      }
    );
  }

  // 대댓글 작성
  const { mutate: submitReply, isPending: isSubmitReplyPending } = useCreateQnaReply(postId);
  function handleSubmitReply(commentId: number, content: string) {
    submitReply({ commentId, content });
    setReplyEditorOpenFor(null);
  }
  function openReplyEditor(commentId: number) {
    setReplyEditorOpenFor(commentId);
  }

  // 대댓글 삭제
  const { mutate: deleteReply, isPending: isDeleteReplyPending } = useDeleteQnaReply(postId);
  function handleDeleteReply(replyCommentId: number) {
    setLastUpdatedReply(replyCommentId);
    deleteReply({ replyCommentId });
  }

  if (isLoading || isCommentsLoading || isDeleteDetailPending) {
    return <PageSkeleton />;
  }

  if (!data || isError || !comments || isCommentsError) {
    console.log('detail error', error);
    console.log('comments error', commentsError);
    return (
      <div className="mt-16 flex items-center justify-center">
        <p>오류가 발생하였습니다. 관리자에게 문의하십시오.</p>
      </div>
    );
  }

  const editable = data.isAuthor || data.allowedAuthorities.includes('EDIT');
  const deletable = data.isAuthor || data.allowedAuthorities.includes('DELETE');
  const commentable = data.isAuthor || comments.allowedAuthorities.includes('COMMENT');
  const replyCommentable = comments.allowedAuthorities.includes('COMMENT');
  const commentDeletable = comments.allowedAuthorities.includes('DELETE_COMMENT');

  // 댓글 표시에 사용할 데이터
  const totalComments = data.officialCommentList.length + comments.total;

  return (
    <>
      <article className="mt-16">
        <PostHeader
          subject={`${data.qnaTargetCode} 건의`}
          title={data.title}
          authorName={`${data.department} ${data.authorName}`}
          createdAt={convertToDate(data.createdAt)}
          className="mb-3"
        />
        <hr className="bg-[#E7E7E7]" />
        <Container>
          <section className="mb-10">
            <ContentViewer content={data.content} />
          </section>
        </Container>
        <PostFooter
          boardUrl="/qna"
          editable={editable}
          deletable={deletable}
          editUrl={`/qna/${postId}/edit`}
          className="mb-20"
          onDelete={handleDeleteDetail}
        />
      </article>
      <hr className="bg-[#E7E7E7]" />
      <Container>
        {!isCommentsLoading && (
          <div className="flex flex-col gap-2">
            <h1 className="mb-5 text-2xl font-bold">
              댓글 <span className="text-primary">{totalComments}</span>
            </h1>
            {commentable && (
              <PostCommentEditor
                className="mb-20"
                placeholder="댓글을 남겨보세요"
                maxLength={2000}
                onSubmit={handleSubmitComment}
                uploading={isSubmitCommentPending}
              />
            )}
            {/* 자치기구 댓글 */}
            {data.officialCommentList.map((comment) => {
              if ((lastUpdatedComment ?? -1) === comment.id && (isPatchCommentPending || isDeleteCommentPending)) {
                return <PostComment.Skeleton key={comment.id} />;
              }
              return (
                <PostComment
                  key={comment.id}
                  author={comment.authorName}
                  createdAt={convertToDate(comment.createdAt)}
                  commentType={comment.commentType}
                  lastEditedAt={comment.lastEditedAt ? convertToDate(comment.lastEditedAt) : undefined}
                  editable={comment.isAuthor}
                  deletable={comment.isAuthor || commentDeletable}
                  deleted={comment.isDeleted ?? false}
                  onDelete={() => handleDeleteComment(comment.id)}
                  onEdit={(content) => handlePatchComment(comment.id, content)}
                >
                  {comment.content}
                </PostComment>
              );
            })}
            {/* 일반 댓글 */}
            {comments.postComments.map((comment) => {
              if ((lastUpdatedComment ?? -1) === comment.id && (isPatchCommentPending || isDeleteCommentPending)) {
                return <PostComment.Skeleton key={comment.id} />;
              }
              return (
                <div key={comment.id} className="relative mb-2">
                  <PostComment
                    key={comment.id}
                    author={`${comment.department} ${comment.authorName}`}
                    createdAt={convertToDate(comment.createdAt)}
                    commentType={comment.commentType}
                    lastEditedAt={comment.lastEditedAt ? convertToDate(comment.lastEditedAt) : undefined}
                    editable={comment.isAuthor}
                    deletable={comment.commentType !== 'OFFICIAL' && (comment.isAuthor || commentDeletable)}
                    deleted={comment.isDeleted ?? false}
                    onDelete={() => handleDeleteComment(comment.id)}
                    onEdit={(content) => handlePatchComment(comment.id, content)}
                  >
                    {comment.content}
                  </PostComment>

                  {!comment.isDeleted && comment.postReplyComments && comment.postReplyComments.length > 0 && (
                    <div className="ml-8 mt-2 flex flex-col gap-2">
                      {comment.postReplyComments.map((reply) => {
                        if ((lastUpdatedReply ?? -1) === reply.id && isDeleteReplyPending) {
                          return <PostComment.Skeleton key={reply.id} />;
                        }
                        return (
                          <PostComment
                            key={reply.id}
                            author={`${reply.department} ${reply.authorName}`}
                            createdAt={convertToDate(reply.createdAt)}
                            lastEditedAt={reply.lastEditedAt ? convertToDate(reply.lastEditedAt) : undefined}
                            deletable={reply.isAuthor || commentDeletable}
                            deleted={reply.isDeleted ?? false}
                            onDelete={() => handleDeleteReply(reply.id)}
                          >
                            {reply.content}
                          </PostComment>
                        );
                      })}
                    </div>
                  )}

                  {!comment.isDeleted && replyCommentable && (
                    <div className="ml-8 mt-2">
                      {replyEditorOpenFor === comment.id ? (
                        <PostCommentEditor
                          placeholder="대댓글 달기"
                          maxLength={2000}
                          onSubmit={(content) => handleSubmitReply(comment.id, content)}
                          uploading={isSubmitReplyPending}
                          onCancel={() => setReplyEditorOpenFor(null)}
                        />
                      ) : (
                        <button
                          className="absolute bottom-6 right-4 text-sm text-gray-400"
                          onClick={() => openReplyEditor(comment.id)}
                        >
                          대댓글 달기
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </>
  );
}
