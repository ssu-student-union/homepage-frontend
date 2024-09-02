interface PartnershipDetailContentProps {
  content: string;
  images?: string[];
}

export function PartnershipDetailContentSection({ content, images = [] }: PartnershipDetailContentProps) {
  return (
    <div className="pt-[32px]">
      <div className="font-sm text-[#484848]">{content}</div>
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
