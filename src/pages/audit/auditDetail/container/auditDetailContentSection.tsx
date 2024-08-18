interface AuditDetailContentProps {
  text: string;
  images?: string[];
}

export function AuditDetailContentSection({ text, images }: AuditDetailContentProps) {
  return (
    <div className="pt-[32px]">
      <div className="font-sm text-[#484848]">{text}</div>
      <div className="h-[32px]" />
      {images?.map((image, index) => (
        <div key={index}>
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
