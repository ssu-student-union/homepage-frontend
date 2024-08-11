import { mainName } from './const/data';

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

function paramToTitle(category: string) {
  switch (category) {
    case 'president':
      return mainName[0];
    case 'central_executive_committee':
      return mainName[1];
    case 'central_operating_committee':
      return mainName[2];
    default:
      return '쿼리가 잘못되었습니다.';
  }
}
