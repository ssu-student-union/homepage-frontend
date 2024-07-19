import { Logo } from "@/components/Logo/Logo";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/useIsMobile";
import { cn } from "@/libs/utils";
import { ReactNode } from "react";
import { List } from "@phosphor-icons/react";
import DropDownMenu from "@/components/DropDownMenu";
import { menuItems } from "@/components/DropDownMenu/const";
import { State } from "./const/state";
import { Link } from "react-router-dom";

interface HeaderProps {
  state?: State;
}

function HeaderSheet({ trigger }: { trigger: ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="border-0 bg-primary text-primary-foreground">
        Content
      </SheetContent>
    </Sheet>
  );
}

export function Header({ state = State.Onboarding }: HeaderProps) {
  const isMobile = useIsMobile();

  const bgColor = state === State.Onboarding ? "bg-background" : "bg-primary";
  const hoverBgColor =
    state === State.Onboarding ? "hover:bg-[#F1F1F1]" : "hover:bg-[#1D4ED8]";
  const textColor =
    state === State.Onboarding ? "text-ghost" : "text-background";
  const fillColor = state === State.Onboarding ? "#000000" : "#ffffff"; // Logo의 아이콘은 text-color 형식이 아니기 때문에 중복 코드 발생

  const headerItemStyle = `flex items-center justify-center h-[60px] sm:h-[50px] xs:h-[50px] px-8 rounded-none text-lg font-bold ${textColor} hover:${textColor} ${bgColor} ${hoverBgColor} transition hover:brightness-95 cursor-pointer`;

  return (
    <>
      <div
        className={cn(
          "fixed top-0 w-[100vw] h-[60px] sm:h-[50px] xs:h-[50px] flex justify-start z-50",
          bgColor
        )}
      >
        {isMobile && (
          <HeaderSheet
            trigger={
              <div className={cn(headerItemStyle, "px-3 text-base")}>
                <List size={28} />
              </div>
            }
          />
        )}
        <div className="flex">
          <div
            className={
              isMobile ? cn(headerItemStyle, "px-0.5") : cn(headerItemStyle)
            }
          >
            <div className="flex items-center gap-4">
              <Logo size={isMobile ? "23px" : "46px"} fill={fillColor} />
              <span className={cn(textColor, "text-lg font-bold")}>US:SUM</span>
            </div>
          </div>
          {!isMobile && (
            <NavigationMenu className="h-full">
              <NavigationMenuList className="h-full">
                {Object.entries(menuItems).map(([category, items]) => (
                  <NavigationMenuItem
                    key={category}
                    className="relative h-full"
                  >
                    <NavigationMenuTrigger className={cn(headerItemStyle)}>
                      {category}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <DropDownMenu
                        items={items}
                        bgColor={bgColor}
                        textColor={textColor}
                        hoverBgColor={hoverBgColor}
                      />
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
                <NavigationMenuItem className="relative h-full">
                  <NavigationMenuTrigger
                    isData={true}
                    className={cn(headerItemStyle)}
                  >
                    <Link to="/a/a">자료집</Link>
                  </NavigationMenuTrigger>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          )}
        </div>

        {!isMobile && state === State.Logout && (
          <div className="flex pr-4">
            <div className={cn(headerItemStyle, "px-6 text-base")}>로그인</div>
          </div>
        )}
      </div>
    </>
  );
}
