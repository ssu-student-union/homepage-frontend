import { mainName } from '../../container/const/data';

interface IntroEditTitleProps {
  category: string;
  subCategory: string;
}

export function IntroEditTitleSection({ category, subCategory }: IntroEditTitleProps) {
  return (
    <div className="mt-[160px] h-auto w-full px-[120px] xs:px-[30px] sm:px-[60px]">
      {/* prettier-ignore */}
      <div className="mb-1 text-2xl font-bold text-black">
        {
        `${categoryToTitle(category)} 
        ${subToTitle(subCategory)}`
        }
      </div>
    </div>
  );
}

function categoryToTitle(category: string) {
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

function subToTitle(subCategory: string) {
  switch (subCategory) {
    case 'intro':
      return '소개';
    case 'org':
      return '조직도';
    default:
      return '쿼리가 잘못되었습니다.';
  }
}
