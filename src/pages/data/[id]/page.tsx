import { PostBody } from '@/components/BoardNew/detail/PostBody';
import { PostFooter } from '@/components/BoardNew/detail/PostFooter';
import { PostHeader } from '@/components/BoardNew/detail/PostHeader';
import { Container } from '@/containers/new/Container';
import { breadcrumbItems, content } from '@/pages/data/[id]/const/mockupData';

export default function DataDetailPage() {
  return (
    <>
      <article className="mt-[120px]">
        <PostHeader
          title={'IT지원위원회 예결산안'}
          authorName={'IT지원위원회'}
          createdAt={new Date('2024/01/15 10:30:00')}
          breadcrumbItems={breadcrumbItems}
        />
        <hr className="bg-[#E7E7E7]" />
        <Container>
          <PostBody
            content={content}
            files={[
              {
                postFileId: 123,
                fileName: 'mockup.pdf',
                fileUrl: 'https://pixabay.com/photos/sunset-tree-water-silhouette-1373171/',
                fileType: 'files',
              },
            ]}
          />
        </Container>
        <PostFooter
          boardUrl="/data"
          editable={true}
          deletable={true}
          editUrl={`/data/edit`}
          className="mb-20"
          onDelete={() => {}}
        />
      </article>
      <hr className="bg-[#E7E7E7]" />
    </>
  );
}
