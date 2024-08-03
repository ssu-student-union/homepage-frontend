interface BoardHeadProp {
  title: string;
  subtitle: React.ReactNode;
}

export function BoardHead({ title, subtitle }: BoardHeadProp) {
  return (
    <div className="block">
      <div className="mb-[11px] text-4xl font-bold">{title}</div>
      <div className="text-base font-normal text-gray-700">{subtitle}</div>
    </div>
  );
}
