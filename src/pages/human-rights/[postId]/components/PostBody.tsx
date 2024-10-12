import { FileResponse } from '@/types/apis/get';
import { Attachment } from '@/pages/human-rights/[postId]/components/Attachment.tsx';

interface PostBodyProps {
  content: string;
  files: FileResponse[];
}

export function PostBody({ content, files }: PostBodyProps) {
  const images = files.filter((file) => file.fileType === 'images');
  const attachments = files.filter((file) => file.fileType === 'files');
  return (
    <>
      <section className="mb-10">{content}</section>
      <section className="mb-10 flex flex-col gap-4">
        {images.map((image) => (
          <img className="w-fit rounded-xs" src={image.fileUrl} alt={image.fileName} />
        ))}
      </section>
      <section className="mb-10 flex flex-col gap-4">
        {attachments.map((attachment) => (
          <Attachment {...attachment} />
        ))}
      </section>
    </>
  );
}
