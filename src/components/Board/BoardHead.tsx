interface BoardHeadProp {
  title: string;
  subtitle: React.ReactNode;
}

export function BoardHead({ title, subtitle }: BoardHeadProp) {
  return (
    <div className="block">
      <div className="mb-1 text-2xl font-bold text-black">{title}</div>
      <div className="text-sm font-bold text-gray-700">{subtitle}</div>
    </div>
  );
}
