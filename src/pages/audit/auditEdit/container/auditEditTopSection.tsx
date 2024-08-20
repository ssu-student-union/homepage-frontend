interface AuditEditTopSectionProps {
  title: string;
}

export function AuditEditTopSection({ title }: AuditEditTopSectionProps) {
  return (
    <>
      <div className="mt-[120px] flex flex-col px-[120px] xs:px-[30px] sm:px-[60px]">
        <div className="mb-1 pt-[24px] text-2xl font-bold text-black">{title}</div>
      </div>
    </>
  );
}
