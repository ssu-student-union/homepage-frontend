import { FileResponse } from '@/types/apis/get';
import { Attachment } from '@/components/BoardNew/detail/Attachment.tsx';
import { ContentViewer } from '@/components/BoardNew/detail/ContentViewer.tsx';

interface PostBodyProps {
  content: string;
  files: FileResponse[];
}

export function PostBody({ content, files }: PostBodyProps) {
  const attachments = files.filter((file) => file.fileType === 'files');
  return (
    <>
      <section className="mb-10">
        <ContentViewer content={content} />
      </section>
      <section className="mb-10 flex flex-col gap-4">
        {attachments.map((attachment) => (
          <Attachment key={attachment.postFileId} {...attachment} />
        ))}
      </section>
    </>
  );
}
