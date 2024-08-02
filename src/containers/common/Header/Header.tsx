import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/useIsMobile';
import { cn } from '@/libs/utils';
import { List, CaretDown } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import DropDownMenu from '@/components/DropDownMenu';
import { menuItems } from '@/components/DropDownMenu/const';
import { dataPath, State } from './const/state';
import { Logo } from '@/components/Logo/Logo';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from '@/components/ui/navigation-menu';
import { getStyles } from './const/style';
import { ReactNode, useState } from 'react';

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
        'fixed top-0 z-50 h-[60px] w-[100vw] xs:h-[50px] sm:h-[50px]',
        isMobile ? 'flex justify-start' : 'flex justify-between',
        styles.bgColor
      )}
    >
      {isMobile && (
        <HeaderSheet
          trigger={
            <div className={cn(styles.headerItemStyle, 'px-3 text-base')}>
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
        <div className={cn(styles.headerItemStyle, { 'px-0.5': isMobile })}>
          <div className="flex items-center gap-4">
            <Logo size={isMobile ? '23px' : '46px'} fill={styles.fillColor} />
            <span className={cn(styles.textColor, 'min-w-fit text-[20px] text-lg font-bold')}>US:SUM</span>
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
            <NavigationMenuItem key={category} className="relative h-full min-w-fit text-[20px]">
              <NavigationMenuTrigger className={cn(styles.headerItemStyle)}>{category}</NavigationMenuTrigger>
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
          <NavigationMenuItem className="relative h-full min-w-fit text-[20px]">
            <NavigationMenuTrigger isData={true} className={cn(styles.headerItemStyle)}>
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
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

    const toggleCategory = (category: string) => {
      setExpandedCategory((prevCategory) => (prevCategory === category ? null : category));
    };

    return (
      <Sheet>
        <SheetTrigger asChild>{trigger}</SheetTrigger>
        <SheetContent className={`flex w-3/4 items-start justify-start border-0 px-0 py-0 outline-none ${bgColor}`}>
          <div className="flex w-full flex-col text-xl font-semibold">
            {Object.entries(menuItems).map(([category, items], index) => (
              <div key={index} className="w-full">
                <div
                  className={`flex h-[64px] w-full flex-row items-center justify-between border-b pl-10 ${sheetBorderColor} cursor-pointer`}
                  onClick={() => toggleCategory(category)}
                >
                  <div className={`flex flex-1 items-center ${textColor}`}>{category}</div>
                  <CaretDown className={`${sheetIconColor}`} size={20} />
                  <div className="w-3"></div>
                </div>
                {expandedCategory === category && (
                  <div
                    className={`flex-center flex flex-col justify-center py-4 ${bgColor} border-b ${sheetBorderColor}`}
                  >
                    {items.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex h-[32px] items-center px-4 pl-12 text-base font-medium ${sheetItemsColor}`}
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
              className={`flex h-[64px] items-center border-b pl-10 ${sheetBorderColor} ${textColor}`}
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
      return <div className={cn(styles.headerItemStyle, 'min-w-fit px-10 text-[20px] text-base')}>내정보</div>;
    }
    if (state === State.Logout) {
      return <div className={cn(styles.headerItemStyle, 'min-w-fit px-10 text-[20px] text-base')}>로그인</div>;
    }
    return null;
  }
}
