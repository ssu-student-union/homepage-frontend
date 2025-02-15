import { FileResponse } from '@/schemas/post';
import { Attachment } from '@/components/BoardNew/detail/Attachment.tsx';
import { ContentViewer } from '@/components/BoardNew/detail/ContentViewer.tsx';
import { DataFileType } from '@/pages/data/schema';

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
        {attachments.map((file) => (
          <Attachment key={file.postFileId} {...file} />
        ))}
      </section>
    </>
  );
}

interface PostBodyDataProps {
  content: string;
  files: DataFileType[];
}

PostBody.Data = ({ content, files }: PostBodyDataProps) => {
  return (
    <>
      <section className="mb-10">
        <ContentViewer content={content} />
      </section>
      <section className="mb-10 flex flex-col gap-4">
        {files.map((file) => (
          <Attachment.Data key={file.postFileId} {...file} />
        ))}
      </section>
    </>
  );
};
