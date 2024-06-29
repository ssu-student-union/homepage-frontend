export interface BoardHeadProp {
  title: string;
  subtitle: string;
}

export function BoardHead({ title, subtitle }: BoardHeadProp) {
  return (
    <div className="ml-[95px] mt-[152px]">
      <div className="text-[34px] font-bold">{title}</div>
      <div className="text-[16px] font-normal">{subtitle}</div>
    </div>
  );
}
