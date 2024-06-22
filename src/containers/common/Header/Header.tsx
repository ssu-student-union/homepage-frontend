import { Logo } from "@/components/Logo/Logo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/useIsMobile";
import { cn } from "@/libs/utils";
import { ReactNode } from "react";
import { List } from "@phosphor-icons/react";

const headerItemStyle =
  "flex items-center justify-center h-[60px] md:h-[80px] rounded-none px-3 text-lg font-bold text-background hover:text-background bg-primary hover:bg-primary transition hover:brightness-95 cursor-pointer";

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

export function Header() {
  const isMobile = useIsMobile();

  return (
    <>
      <div className="fixed top-0 bottom-0 w-[100dvw] h-[60px] md:h-[80px] bg-primary flex justify-between">
        <div className="flex">
          <div className={cn(headerItemStyle, "px-4")}>
            <div className="flex items-center gap-3">
              <Logo size={isMobile ? "32px" : "46px"} />
              <span className="text-background text-lg font-bold">US:SUM</span>
            </div>
          </div>
          {!isMobile && (
            <NavigationMenu className="h-full">
              <NavigationMenuList className="h-full">
                <NavigationMenuItem className="h-full relative">
                  <NavigationMenuTrigger className={cn(headerItemStyle)}>
                    총학생회
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>123</NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem className="h-full relative">
                  <NavigationMenuTrigger className={cn(headerItemStyle)}>
                    학교생활
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>123321</NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem className="h-full relative">
                  <NavigationMenuTrigger className={cn(headerItemStyle)}>
                    학생자치기구
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>123123321</NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem className="h-full relative">
                  <NavigationMenuTrigger className={cn(headerItemStyle)}>
                    소통
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>123123321123</NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          )}
        </div>
        <div className="flex">
          {!isMobile && (
            <div className={cn(headerItemStyle, "px-6")}>로그인</div>
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
