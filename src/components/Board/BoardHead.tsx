interface BoardHeadProp {
  title: string;
  subtitle: string;
}

export function BoardHead({ title, subtitle }: BoardHeadProp) {
  return (
    <div className="mt-[152px] border-b-2">
      <div className="ml-[95px] mb-[42px]">
        <div className=" text-[34px] font-bold">{title}</div>
        <div className="text-[16px] font-normal">{subtitle}</div>
      </div>
    </div>
  );
}
