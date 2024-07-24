interface BoardHeadProp {
  title: string;
  subtitle: string;
}

export function BoardHead({ title, subtitle }: BoardHeadProp) {
  return (
    <div className="block">
      <div className="mb-2 text-4xl font-bold">{title}</div>
      <div className="text-base font-normal">{subtitle}</div>
    </div>
  );
}
