import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/useIsMobile";
import { cn } from "@/libs/utils";
import { List, CaretDown } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import DropDownMenu from "@/components/DropDownMenu";
import { menuItems } from "@/components/DropDownMenu/const";
import { dataPath, State } from "./const/state";
import { Logo } from "@/components/Logo/Logo";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { getStyles } from "./const/style";
import { ReactNode, useState } from "react";

interface HeaderProps {
  state?: State;
}

interface HeaderSheetProps {
  trigger: ReactNode;
  sheetBorderColor: string;
  bgColor: string;
  textColor: string;
  sheetIconColor: string;
  sheetItemsColor: string;
}

export function Header({ state = State.Onboarding }: HeaderProps) {
  const isMobile = useIsMobile();
  const styles = getStyles(state);

  return (
    <div
      className={cn(
        "fixed top-0 w-[100vw] h-[60px] sm:h-[50px] xs:h-[50px] z-50",
        isMobile ? "flex justify-start" : "flex justify-between",
        styles.bgColor
      )}
    >
      {isMobile && (
        <HeaderSheet
          trigger={
            <div className={cn(styles.headerItemStyle, "px-3 text-base")}>
              <List size={28} />
            </div>
          }
          sheetBorderColor={styles.sheetBorderColor}
          bgColor={styles.bgColor}
          textColor={styles.textColor}
          sheetIconColor={styles.sheetIconColor}
          sheetItemsColor={styles.sheetItemsColor}
        />
      )}
      <div className="flex">
        <div className={cn(styles.headerItemStyle, { "px-0.5": isMobile })}>
          <div className="flex items-center gap-4">
            <Logo size={isMobile ? "23px" : "46px"} fill={styles.fillColor} />
            <span
              className={cn(
                styles.textColor,
                "text-lg font-bold text-[20px] min-w-fit"
              )}
            >
              US:SUM
            </span>
          </div>
        </div>
        {!isMobile && renderNavigationMenu()}
      </div>
      {!isMobile && <div className="flex pr-4">{renderAuthButtons()}</div>}
    </div>
  );

  function renderNavigationMenu() {
    return (
      <NavigationMenu className="h-full">
        <NavigationMenuList className="h-full">
          {Object.entries(menuItems).map(([category, items]) => (
            <NavigationMenuItem
              key={category}
              className="relative h-full text-[20px] min-w-fit"
            >
              <NavigationMenuTrigger className={cn(styles.headerItemStyle)}>
                {category}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <DropDownMenu
                  items={items}
                  bgColor={styles.bgColor}
                  textColor={styles.textColor}
                  hoverBgColor={styles.hoverBgColor}
                />
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
          <NavigationMenuItem className="relative h-full text-[20px] min-w-fit">
            <NavigationMenuTrigger
              isData={true}
              className={cn(styles.headerItemStyle)}
            >
              <Link to={dataPath}>자료집</Link>
            </NavigationMenuTrigger>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  }

  function HeaderSheet({
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
        <SheetContent
          className={`border-0 outline-none flex items-start justify-start w-3/4 px-0 py-0 ${bgColor}`}
        >
          <div className="w-full flex flex-col font-semibold text-xl">
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
            <Link
              to={dataPath}
              className={`h-[64px] flex items-center pl-10 border-b ${sheetBorderColor} ${textColor}`}
            >
              자료집
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  function renderAuthButtons() {
    if (state === State.Login) {
      return (
        <div
          className={cn(
            styles.headerItemStyle,
            "px-10 text-base text-[20px] min-w-fit"
          )}
        >
          내정보
        </div>
      );
    }
    if (state === State.Logout) {
      return (
        <div
          className={cn(
            styles.headerItemStyle,
            "px-10 text-base text-[20px] min-w-fit"
          )}
        >
          로그인
        </div>
        );
      }
      return null;
    }
  }
