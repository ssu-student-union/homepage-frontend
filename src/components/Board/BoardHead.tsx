interface BoardHeadProp {
  title: string;
  subtitle: string;
}

export function BoardHead({ title, subtitle }: BoardHeadProp) {
  return (
    <div className="border-b-2">
      <div className="ml-24 mb-9">
        <div className="mb-2 text-4xl font-bold">{title}</div>
        <div className="text-base font-normal">{subtitle}</div>
      </div>
    </div>
  );
}
