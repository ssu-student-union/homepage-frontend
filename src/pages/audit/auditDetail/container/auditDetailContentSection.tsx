import { Viewer } from '@toast-ui/react-editor';

interface AuditDetailContentProps {
  content: string;
  images?: string[];
}

export function AuditDetailContentSection({ content, images = [] }: AuditDetailContentProps) {
  return (
    <div className="pt-[32px]">
      <Viewer initialValue={content} />
      <div className="h-[32px] xs:flex xs:flex-col xs:items-center sm:flex sm:flex-col sm:items-center " />
      {images?.map((image, index) => (
        <div key={image + index}>
          <img
            src={image}
            alt={`ERROR 404`}
            className={`${index === images.length - 1 ? 'pb-[32px]' : 'pb-[24px]'} h-auto w-[640px] xs:w-full sm:w-full`}
          />
        </div>
      ))}
    </div>
  );
}
