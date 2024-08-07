import { dataPath, menuItems } from '@/containers/common/Header/const/pathData';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { CaretDown } from '@phosphor-icons/react';
import { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';

interface HeaderSheetProps {
  trigger: ReactNode;
}

export function HeaderSheet({ trigger }: HeaderSheetProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    setExpandedCategory((prevCategory) => (prevCategory === category ? null : category));
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      {/* prettier ignore */}
      <SheetContent
        className={`left-0 top-[50px] flex w-[260px] items-start justify-start border-0 bg-white px-0 py-0 text-lg font-semibold outline-none md:top-[60px]`}
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
                <div className={`flex flex-1 items-center text-[#1F2937] hover:text-[#6B7280]`}>{category}</div>
                <CaretDown className="text-[#9CA3AF]" size={20} />
                <div className="w-4"></div>
              </div>
              {expandedCategory === category && (
                <div className={`flex-center flex flex-col justify-center border-b border-[#E5E7EB] bg-white py-4`}>
                  {items.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex h-[32px] items-center px-4 pl-12 text-base font-medium text-[#4B5563] hover:text-[#9CA3AF]`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          {/* pretier ignore */}
          <Link to={dataPath} className={`flex h-[64px] items-center border-b border-[#E5E7EB] pl-10 text-[#1F2937]`}>
            자료집
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
