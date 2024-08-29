import { dataPath, menuItems } from '@/containers/common/Header/const/pathData';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { CaretDown } from '@phosphor-icons/react';
import { ReactNode, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { State } from '../const/state';

interface HeaderSheetProps {
  trigger: ReactNode;
  state?: State;
}

export function HeaderSheet({ trigger, state = State.Logout }: HeaderSheetProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleCategory = (category: string) => {
    setExpandedCategory((prevCategory) => (prevCategory === category ? null : category));
  };

  const handleLinkClick = (path: string) => {
    navigate(path);
    window.location.reload();
  };

  return (
    <div className="xl:hidden xxl:hidden">
      <Sheet>
        <SheetTrigger asChild>{trigger}</SheetTrigger>
        <SheetContent
          className={`left-0 top-[60px] flex w-[260px] items-start justify-start border-0 bg-white px-0 py-0 text-lg font-semibold marker:outline-none xs:top-[50px] sm:top-[50px] md:top-[50px] `}
        >
          <div className="flex w-full flex-col">
            {Object.entries(menuItems).map(([category, items], index) => (
              <div key={index} className="w-full">
                <div
                  className={`flex h-[64px] w-full cursor-pointer flex-row items-center justify-between border-b 
                border-[#E5E7EB]
                pl-10`}
                  onClick={() => toggleCategory(category)}
                >
                  <div className={`flex flex-1 items-center text-gray-800 hover:text-[#6B7280]`}>{category}</div>
                  <CaretDown className="text-[#9CA3AF]" size={20} />
                  <div className="w-4"></div>
                </div>
                {expandedCategory === category && (
                  <div className={`flex-center flex flex-col justify-center border-b border-[#E5E7EB] bg-white py-4`}>
                    {items.map((item) => (
                      <div
                        key={item.path}
                        onClick={() => handleLinkClick(item.path)}
                        className={`flex h-[32px] cursor-pointer items-center px-4 pl-12 text-base font-medium text-[#4B5563] hover:text-[#9CA3AF]`}
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div
              onClick={() => handleLinkClick(dataPath)}
              className={`flex h-[64px] cursor-pointer items-center border-b border-[#E5E7EB] pl-10 text-gray-800`}
            >
              자료집
            </div>
            <a
              href={`https://ssuketch60.cafe24.com/`}
              className={`flex h-[64px] cursor-pointer items-center border-b border-[#E5E7EB] pl-10 text-gray-800`}
            >
              이전 홈페이지
            </a>
            <Link
              className={`flex h-[64px] cursor-pointer items-center border-b border-[#E5E7EB] pl-10 text-gray-800`}
              to={state === State.Login ? `/homepage-frontend/my` : `/homepage-frontend/register`}
              onClick={() => window.location.reload()}
            >
              {state === State.Login ? '내정보' : '로그인'}
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
