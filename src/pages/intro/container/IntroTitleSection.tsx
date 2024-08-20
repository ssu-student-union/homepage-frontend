interface IntroTitleProps {
  title: string;
  subTitle: string;
}

export default function IntroTitleSection({ title, subTitle }: IntroTitleProps) {
  return (
    <div className="mt-[120px] h-auto w-full px-[120px] xs:px-[30px] sm:px-[60px]">
      <div className="mb-1 text-2xl font-bold text-black">{title}</div>
      <div className="text-base font-bold text-gray-700">{subTitle}</div>
    </div>
  );
}
