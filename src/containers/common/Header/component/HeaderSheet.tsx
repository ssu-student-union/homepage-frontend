import { dataPath, menuItems } from "@/containers/common/Header/const/pathData";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CaretDown } from "@phosphor-icons/react";
import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";

interface HeaderSheetProps {
    trigger: ReactNode;
    sheetBorderColor: string;
    bgColor: string;
    textColor: string;
    sheetIconColor: string;
    sheetItemsColor: string;
  }

export function HeaderSheet({
    trigger,
    sheetBorderColor,
    bgColor,
    textColor,
    sheetIconColor,
    sheetItemsColor,
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
        <SheetContent className = {`md:top-[60px] top-[50px] left-0 border-0 outline-none flex items-start justify-start text-lg font-semibold w-[280px] px-0 py-0 ${bgColor}`}>
          <div className="flex flex-col w-full">
            {Object.entries(menuItems).map(([category, items], index) => (
              <div key={index} className="w-full">
                <div
                  className={`w-full h-[64px] flex flex-row items-center justify-between pl-10 border-b ${sheetBorderColor} cursor-pointer`}
                  onClick={() => toggleCategory(category)}
                >
                  <div className={`flex-1 flex items-center ${textColor}`}>
                    {category}
                  </div>
                  <CaretDown className={`${sheetIconColor}`} size={20} />
                  <div className="w-3"></div>
                </div>
                {expandedCategory === category && (
                  <div
                    className={`flex flex-col flex-center justify-center py-4 ${bgColor} border-b ${sheetBorderColor}`}
                  >
                    {items.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center h-[32px] px-4 pl-12 font-medium text-base ${sheetItemsColor}`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {/* pretier ignore */}
            <Link to={dataPath} className={`h-[64px] flex items-center pl-10 border-b ${sheetBorderColor} ${textColor}`}>
              자료집
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    );
  }