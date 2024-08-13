interface AuditDetailContentProps {
  text: string;
  images?: Array<string>;
}

export function AuditDetailContentSection({ text, images }: AuditDetailContentProps) {
  return (
    <>
      <div className="px-[120px] pt-[48px] xs:px-[20px] sm:px-[40px]">
        <div>{text}</div>
      </div>
    </>
  );
}
