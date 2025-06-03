import { FileResponse } from '@/schemas/post';
import { Attachment } from '@/components/detail/Attachment';
import { ContentViewer } from '@/components/detail/ContentViewer';

interface PostBodyProps {
  content: string;
  files: FileResponse[];
}

export function PostBody({ content, files }: PostBodyProps) {
  const images = files.filter((file) => file.fileType === 'images');
  const attachments = files.filter((file) => file.fileType !== 'images');
  return (
    <>
      <section className="mb-10">
        <ContentViewer content={content} />
      </section>
      {images.length > 0 && (
        <section className="mb-10">
          {images.map((file) => (
            <img
              key={file.postFileId}
              src={file.fileUrl}
              alt={file.fileName}
              className="mb-8 h-auto w-full rounded-sm object-contain md:max-w-2xl"
            />
          ))}
        </section>
      )}
      <section className="mb-10 flex flex-col gap-4">
        {attachments.map((file) => (
          <Attachment key={file.postFileId} {...file} />
        ))}
      </section>
    </>
  );
}
