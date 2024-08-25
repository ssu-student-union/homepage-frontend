import { categoryToTitle, subToTitle } from '../utils/dataUtils';

interface IntroEditTitleProps {
  category: string;
  subCategory: string;
}

export function IntroEditTitleSection({ category, subCategory }: IntroEditTitleProps) {
  return (
    <div className="mt-[160px] h-auto w-full">
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
