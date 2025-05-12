import { Viewer } from '@toast-ui/react-editor';

interface AuditDetailContentProps {
  content: string;
  images?: string[];
}

export function AuditDetailContentSection({ content, images = [] }: AuditDetailContentProps) {
  return (
    <div className="pt-[32px]">
      <Viewer initialValue={content} />
      <div className="flex h-[32px] flex-col items-center md:hidden" />
      {images?.map((image, index) => (
        <div key={image + index}>
          <img
            src={image}
            alt={`ERROR 404`}
            className={`${index === images.length - 1 ? 'pb-[32px]' : 'pb-[24px]'} h-auto w-full md:w-[640px]`}
          />
        </div>
      ))}
    </div>
  );
}
