import { paramToTitle } from './utils/dataUtils';

interface IntroTitleProps {
  category?: string;
}

export default function IntroTitleSection({ category = 'president' }: IntroTitleProps) {
  return (
    <div className="mt-[160px] h-auto w-full px-[120px] xs:px-[30px] sm:px-[60px]">
      <div className="mb-1 text-2xl font-bold text-black">{paramToTitle(category)}</div>
      <div className="text-base font-bold text-gray-700">
        제64대 {paramToTitle(category)} {category == 'president' ? 'US:SUM' : ''}
      </div>
    </div>
  );
}
