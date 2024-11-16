import { useParams } from 'react-router-dom';
import { PostHeader } from '@/pages/human-rights/[id]/components/PostHeader.tsx';
import { Frontmatter } from '@/pages/human-rights/[id]/components/Frontmatter.tsx';
import { PostBody } from '@/pages/human-rights/[id]/components/PostBody.tsx';
import { PostFooter } from '@/pages/human-rights/[id]/components/PostFooter.tsx';
import { PostCommentEditor } from '@/pages/human-rights/[id]/components/PostCommentEditor.tsx';
import { PostComment } from '@/pages/human-rights/[id]/components/PostComment.tsx';
import { HumanRightsPerson, HumanRightsReporter } from '@/pages/human-rights/schema.ts';
import { Container } from '@/pages/human-rights/containers/Container.tsx';
import { useGetHumanRightsComments, useGetHumanRightsPost } from '@/pages/human-rights/queries.ts';

const breadcrumbItems: [string, string | null][] = [
  ['소통', null],
  ['인권신고게시판', '/human-rights'],
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
  const { data: post, isLoading, error, isError } = useGetHumanRightsPost({ postId, queryOptions: { retry: true } });
  const {
    data: comments,
    isLoading: isCommentsLoading,
    error: commentsError,
    isError: isCommentsError,
  } = useGetHumanRightsComments({ postId, type: '최신순', queryOptions: { retry: true } });

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (isNaN(postId) || !post || isError || !comments || isCommentsError) {
    console.log(error, commentsError);
    // TODO: 오류 발생 시 세부정보 제공
    return (
      <div className="mt-[120px] flex items-center justify-center">
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

  const totalComments = comments.total;
  const commentAcl = comments.allowedAuthorities;

  const editable = post.isAuthor || post.allowedAuthorities.includes('EDIT');
  const deletable = post.isAuthor || post.allowedAuthorities.includes('DELETE');
  const commentable = post.isAuthor || commentAcl.includes('COMMENT');
  const comment_deletable = commentAcl.includes('DELETE_COMMENT');

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
          {reporter && <ReporterFrontmatter reporter={reporter} />}
          {victims.map((victim, idx) => (
            <PersonFrontmatter key={`victims-${idx}`} title={`피침해자 ${idx + 1}`} person={victim} />
          ))}
          {attackers.map((attacker, idx) => (
            <PersonFrontmatter key={`attackers-${idx}`} title={`침해자 ${idx + 1}`} person={attacker} />
          ))}
          <PostBody content={post.content} files={post.fileResponseList} />
        </Container>
        <PostFooter
          boardUrl="/human-rights"
          editable={editable}
          deletable={deletable}
          editUrl={`/human-rights/${postId}/edit`}
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
            {[...post.officialCommentList, ...comments.postComments].map((comment) => (
              <PostComment
                key={comment.id}
                author={comment.authorName}
                createdAt={new Date(comment.createdAt)}
                commentType={comment.commentType}
                lastEditedAt={comment.lastEditedAt === null ? undefined : new Date(comment.lastEditedAt)}
                editable={comment.isAuthor}
                deletable={comment.isAuthor || comment_deletable}
                deleted={comment.isDeleted ?? false}
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
