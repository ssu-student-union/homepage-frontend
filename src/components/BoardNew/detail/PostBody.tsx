import { FileResponse } from '@/schemas/post';
import { Attachment } from '@/components/BoardNew/detail/Attachment.tsx';
import { ContentViewer } from '@/components/BoardNew/detail/ContentViewer.tsx';

interface PostBodyProps {
  content: string;
  files: FileResponse[];
}

export function PostBody({ content, files }: PostBodyProps) {
  const attachments = files.filter((file) => file.fileType !== 'images');
  return (
    <>
      <section className="mb-10">
        <ContentViewer content={content} />
      </section>
      <section className="mb-10 flex flex-col gap-4">
        {attachments.map((file) => (
          <Attachment key={file.postFileId} {...file} />
        ))}
      </section>
    </>
  );
}
