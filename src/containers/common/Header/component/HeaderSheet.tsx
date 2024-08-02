import { dataPath, menuItems } from "@/containers/common/Header/const/pathData";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CaretDown } from "@phosphor-icons/react";
import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";

interface HeaderSheetProps {
    trigger: ReactNode;
  }

export function HeaderSheet({
    trigger,
  }: HeaderSheetProps) {
    const [expandedCategory, setExpandedCategory] = useState<string | null>(
      null
    );

    const toggleCategory = (category: string) => {
      setExpandedCategory((prevCategory) =>
        prevCategory === category ? null : category
      );
    };

    return (
      <Sheet>
        <SheetTrigger asChild>{trigger}</SheetTrigger>
        {/* prettier ignore */}
        <SheetContent className = {`md:top-[60px] top-[50px] left-0 border-0 outline-none flex items-start justify-start text-lg font-semibold w-[260px] px-0 py-0 bg-white`}>
          <div className="flex flex-col w-full">
            {Object.entries(menuItems).map(([category, items], index) => (
              <div key={index} className="w-full">
                <div
                  className={`w-full h-[64px] flex flex-row items-center justify-between pl-10 border-b 
                  border-[#E5E7EB]
                  cursor-pointer`}
                  onClick={() => toggleCategory(category)}
                >
                  <div className={`flex-1 flex items-center text-[#1F2937] hover:text-[#6B7280]`}>
                    {category}
                  </div>
                  <CaretDown className="text-[#9CA3AF]" size={20} />
                  <div className="w-4"></div>
                </div>
                {expandedCategory === category && (
                  <div
                    className={`flex flex-col flex-center justify-center py-4 bg-white border-b border-[#E5E7EB]`}
                  >
                    {items.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center h-[32px] px-4 pl-12 font-medium text-base text-[#4B5563] hover:text-[#9CA3AF]`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {/* pretier ignore */}
            <Link to={dataPath} className={`h-[64px] flex items-center pl-10 border-b border-[#E5E7EB] text-[#1F2937]`}>
              자료집
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    );
  }