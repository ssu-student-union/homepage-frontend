import { useIsMobile } from "@/hooks/useIsMobile";
import { cn } from "@/libs/utils";
import { List} from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import DropDownMenu from "@/containers/common/Header/component/DropDownMenu";
import { dataPath, menuItems } from "@/containers/common/Header/const/pathData";
import { Logo } from "@/components/Logo/Logo";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { getStyles } from "./const/style";
import { HeaderSheet } from "./component/HeaderSheet";
import { State } from "./const/state";

interface HeaderProps {
  state?: State;
}

export function Header({ state = State.Onboarding }: HeaderProps) {
  const isMobile = useIsMobile();
  const styles = getStyles(state);

  return (
    // prettier ignore
    <div className={cn(
        "fixed top-0 w-[100vw] h-[60px] sm:h-[50px] xs:h-[50px]",
        isMobile ? "flex justify-start" : "flex justify-between",
        styles.bgColor,)}
      style = {{zIndex: 100}}>
      {isMobile && (
        <HeaderSheet
          trigger={<div className={cn(styles.headerItemStyle, "px-3 text-base")}>
              <List size={28} />
            </div>}
          sheetBorderColor={styles.sheetBorderColor}
          bgColor={styles.bgColor}
          textColor={styles.textColor}
          sheetIconColor={styles.sheetIconColor}
          sheetItemsColor={styles.sheetItemsColor}
        />
      )}
      <Link to='/' className="flex">
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
      </Link>
      {!isMobile && <div className="flex pr-4">{renderAuthButtons()}</div>}
    </div>
  );

  function renderNavigationMenu() {
    return (
      // pretier ignore
      <NavigationMenu className="h-full">
        <NavigationMenuList className="h-full">
          {Object.entries(menuItems).map(([category, items]) => (
            <NavigationMenuItem key={category} className="relative h-full text-[20px] min-w-fit">
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
            <NavigationMenuTrigger isData={true} className={cn(styles.headerItemStyle)}>
              <Link to={dataPath}>자료집</Link>
            </NavigationMenuTrigger>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  }

  function renderAuthButtons() {
    if (state === State.Login) {
      return (
        <div className={cn(styles.headerItemStyle,"px-10 text-base text-[20px] min-w-fit")}>
          내정보
        </div>
      );
    }
    if (state === State.Logout) {
      return (
        <div className={cn(styles.headerItemStyle,"px-10 text-base text-[20px] min-w-fit")}>
          로그인
        </div>
      );
    }
    return null;
  }
}
