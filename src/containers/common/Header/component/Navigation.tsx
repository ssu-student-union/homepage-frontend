import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from '@/components/ui/navigation-menu';
import { dataPath, menuItems } from '../const/pathData';
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
        <NavigationMenuItem className="relative h-full min-w-fit text-[20px]">
          <NavigationMenuTrigger isData={true} className={cn(styles.headerItemStyle)}>
            <a href={`https://ssuketch60.cafe24.com/`}>이전 홈페이지</a>
          </NavigationMenuTrigger>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
