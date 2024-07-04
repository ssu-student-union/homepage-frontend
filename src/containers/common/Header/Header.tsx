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
import DropMenu from "@/components/DropMenu";
import { menuItems } from "@/components/DropMenu/const";

interface HeaderProps {
  isLogin?: boolean;
}

function HeaderSheet({ trigger }: { trigger: ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="bg-primary text-primary-foreground border-0">
        Content
      </SheetContent>
    </Sheet>
  );
}

export function Header({ isLogin = true }: HeaderProps) {
  const isMobile = useIsMobile();

  const bgColor = isLogin ? "bg-primary" : "bg-background";
  const textColor = isLogin ? "text-background" : "text-ghost";
  const fillColor = isLogin ? "#ffffff" : "#000000"; // Logo의 아이콘은 text-color 형식이 아니기 때문에 중복 코드 발생

  const headerItemStyle = `flex items-center justify-center h-[60px] md:h-[80px] rounded-none px-3 text-lg font-bold ${textColor} hover:${textColor} ${bgColor} hover:${bgColor} transition hover:brightness-95 cursor-pointer`;

  return (
    <>
      <div
        className={cn(
          "fixed top-0 w-[100vw] h-[60px] md:h-[80px] flex justify-between z-50",
          bgColor
        )}
      >
        <div className="flex">
          <div className={cn(headerItemStyle, "px-8")}>
            <div className="flex items-center gap-3">
              <Logo size={isMobile ? "32px" : "46px"} fill={fillColor} />
              <span className={cn(textColor, "text-lg font-bold")}>US:SUM</span>
            </div>
          </div>
          {!isMobile && (
            <NavigationMenu className="h-full">
              <NavigationMenuList className="h-full">
                {Object.entries(menuItems).map(([category, items]) => (
                  <NavigationMenuItem key={category} className="h-full">
                    <NavigationMenuTrigger className={cn(headerItemStyle)}>
                      {category}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <DropMenu items={items} />
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          )}
        </div>
        <div className="flex">
          {!isMobile && isLogin && (
            <div className={cn(headerItemStyle, "px-6 text-base")}>
              로그아웃
            </div>
          )}
          {isMobile && (
            <HeaderSheet
              trigger={
                <div className={cn(headerItemStyle, "px-6 text-base")}>
                  <List size={28} />
                </div>
              }
            />
          )}
        </div>
      </div>
    </>
  );
}
