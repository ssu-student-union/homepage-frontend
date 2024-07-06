import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { useIsMobile } from "@/hooks/useIsMobile";
import DropMenu from "@/components/DropMenu";
import { menuItems, studentInfo } from "@/components/DropMenu/const";




export function RegisterFailedSection() {

    const isMobile = useIsMobile();

  return (
    <div>
            <div className="text-[#2F4BF7] text-[32px] not-italic font-bold leading-[normal] tracking-[-0.96px]">아이쿠, 실수가 있었나봐요</div>
            <div className="text-[#000] text-[19px] not-italic font-bold leading-[normal] tracking-[-0.96px]">단과대학과 학과/부 정보를 입력해주세요</div>
            <div className="w-[435px] h-[1px] stroke-[1px] stroke-[#929292] mt-[20px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="436" height="1" viewBox="0 0 436 1" fill="none">
                    <path d="M0.5 0.5H435.5" stroke="#929292"/>
                </svg>
            </div>
            <div className="flex mt-[20px]">
                    {!isMobile && (
                    <NavigationMenu className="h-full">
                    <NavigationMenuList className="h-full flex flex-col">
                        {Object.entries(studentInfo).map(([category, items]) => (
                        <NavigationMenuItem
                            key={category}
                            className="relative h-full "
                        >
                            <NavigationMenuTrigger className={" mt-[14px] flex items-center justify-start w-[435px] md:h-[60px] rounded-[12px] border-[1px] border-[solid] border-[var(--gray-700,#374151)] px-3 text-lg font-bold text-[#000] hover:${textColor} ${bgColor} ${hoverBgColor} transition hover:brightness-95 cursor-pointer"}>
                            {category}
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                            <DropMenu
                                items={items}
                                bgColor={"bg-background"}
                                textColor={"hover:bg-[#F1F1F1]"}
                                hoverBgColor={"text-ghost"}
                            />
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                    </NavigationMenu>
                )}
            </div>

            <div className="mt-[35px]"></div>

            <Button variant={"default"} size={"default"} className="w-[431px] mb-4 bg-[#9CA3AF] text-[#fff]">입력완료</Button>
    </div>
  );
}
