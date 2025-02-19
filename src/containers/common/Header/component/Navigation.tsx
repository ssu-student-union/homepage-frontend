import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { DATA_PATH, MENU_ITEMS, OLD_URL } from '../const/pathData';
import { getStyles } from '../const/style';
import { State } from '../const/state';
import { cn } from '@/libs/utils';
import DropDownMenu from './DropDownMenu';
import { Link } from 'react-router-dom';

interface NavigationProps {
  state?: State;
}

export function Navigation({ state = State.Onboarding }: NavigationProps) {
  const styles = getStyles(state);
  return (
    <NavigationMenu className="h-full xs:hidden sm:hidden md:hidden lg:hidden">
      <NavigationMenuList className="h-full">
        {Object.entries(MENU_ITEMS).map(([category, items]) => (
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
          <NavigationMenuLink asChild>
            <Link to={`${DATA_PATH}`} className={cn(styles.headerItemStyle)}>
              자료집
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="relative h-full min-w-fit text-[20px]">
          <NavigationMenuLink asChild>
            <Link to={`${OLD_URL}`} className={cn(styles.headerItemStyle)}>
              이전 홈페이지
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
