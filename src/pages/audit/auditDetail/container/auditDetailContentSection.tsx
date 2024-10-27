import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';

interface AuditDetailContentProps {
  content: string;
  images?: string[];
}

export function AuditDetailContentSection({ content, images = [] }: AuditDetailContentProps) {
  return (
    <div className="pt-[32px]">
      <ReactMarkdown rehypePlugins={[rehypeSanitize]} className="font-sm text-[#484848]">
        {content}
      </ReactMarkdown>
      <div className="h-[32px]" />
      {images?.map((image, index) => (
        <div key={image + index}>
          <img
            src={image}
            alt={`ERROR 404`}
            className={`${index === images.length - 1 ? 'pb-[32px]' : 'pb-[24px]'} h-[375px] w-auto xs:h-[150px] sm:h-[300px]`}
          />
        </div>
      ))}
    </div>
  );
}
