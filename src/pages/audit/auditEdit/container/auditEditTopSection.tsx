interface AuditEditTopSectionProps {
  title: string;
}

export function AuditEditTopSection({ title }: AuditEditTopSectionProps) {
  return (
    <>
      <div className="mt-[120px] flex flex-col">
        <div className="mb-1 pt-[24px] text-2xl font-bold text-black">{title}</div>
      </div>
    </>
  );
}
