import { cn } from '@/libs/utils';
import { List } from '@phosphor-icons/react';
import { HeaderSheet } from './component/HeaderSheet';
import { AuthButton } from './component/AuthButton';
import { State } from './const/state';
import { Link } from 'react-router';
import SsureLogo from '@/components/logo/SsureLogo';
import { TranslateButton } from '@/components/deprecated/Buttons/TranslateButton';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { useTranslation } from 'react-i18next';
import { getStyles } from '@/containers/common/Header/const/style';
import { DATA_PATH, MENU_ITEMS, OLD_URL, QNA_PATH } from '@/containers/common/Header/const/pathData';
import DropDownMenu from '@/containers/common/Header/component/DropDownMenu';

interface HeaderProps {
  state?: State;
  onLogout?: () => void;
}

export function Header({ state = State.Onboarding, onLogout = () => {} }: HeaderProps) {
  // 번역 훅
  const { t, i18n } = useTranslation();

  // 언어 변경 함수
  const handleToggleLanguage = () => {
    const newLang = i18n.language === 'ko' ? 'en' : 'ko';
    i18n.changeLanguage(newLang);
    localStorage.setItem('lang', newLang);
  };

  const textSize = i18n.language === 'en' ? 'text-xs' : 'text-lg';
  // 스타일 불러오기
  const styles = getStyles(state);
  return (
    <div
      className={cn(
        'top-0 z-50 flex h-12 w-full items-center justify-start bg-background transition-colors xl:h-16',
        state !== State.Onboarding && 'xl:bg-primary'
      )}
    >
      <HeaderSheet
        trigger={
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              navigationMenuTriggerStyle(),
              'h-full w-16 bg-transparent px-4 text-base font-bold text-foreground transition-all hover:text-foreground xl:hidden',
              state !== State.Onboarding && 'xl:text-background hover:xl:text-primary-foreground'
            )}
          >
            <List className="size-6 shrink-0" />
          </Button>
        }
      />
      <Link
        className={cn(
          navigationMenuTriggerStyle(),
          'h-full bg-background text-foreground xl:px-7',
          state !== State.Onboarding && 'xl:bg-primary xl:text-background'
        )}
        to="/"
      >
        <SsureLogo className={cn('h-4 object-contain invert xl:h-6', state !== State.Onboarding && 'xl:invert-0')} />
      </Link>
      <NavigationMenu className="hidden h-full grow items-stretch *:grow xl:flex">
        <NavigationMenuList className="h-full items-stretch justify-stretch">
          {Object.entries(MENU_ITEMS).map(([category, items]) => (
            <NavigationMenuItem key={category}>
              <NavigationMenuTrigger
                className={cn(
                  navigationMenuTriggerStyle(),
                  'h-full bg-transparent px-7 text-foreground transition-colors hover:text-foreground',
                  state !== State.Onboarding && 'xl:text-primary-foreground hover:xl:text-primary-foreground',
                  textSize
                )}
              >
                {t(`header.${category}`)}
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
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                to={`${QNA_PATH}`}
                className={cn(
                  navigationMenuTriggerStyle(),
                  'h-full bg-transparent px-7 text-foreground transition-colors hover:text-foreground',
                  state !== State.Onboarding && 'xl:text-primary-foreground hover:xl:text-primary-foreground',
                  textSize
                )}
              >
                {t('header.질의응답게시판')}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                to={`${DATA_PATH}`}
                className={cn(
                  navigationMenuTriggerStyle(),
                  'h-full bg-transparent px-7 text-foreground transition-colors hover:text-foreground',
                  state !== State.Onboarding && 'xl:text-primary-foreground hover:xl:text-primary-foreground',
                  textSize
                )}
              >
                {t('header.자료집')}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                to={`${OLD_URL}`}
                className={cn(
                  navigationMenuTriggerStyle(),
                  'h-full bg-transparent px-7 text-foreground transition-colors hover:text-foreground',
                  state !== State.Onboarding && 'xl:text-primary-foreground hover:xl:text-primary-foreground',
                  textSize
                )}
              >
                {t('header.이전 홈페이지')}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <div className="hidden grow items-center justify-end gap-2 px-4 xl:flex">
            <TranslateButton
              className={cn(
                navigationMenuTriggerStyle(),
                'h-full bg-transparent px-7 text-foreground transition-colors hover:bg-background hover:text-foreground hover:brightness-95',
                state !== State.Onboarding &&
                  'hidden xl:flex xl:text-primary-foreground hover:xl:bg-primary hover:xl:text-primary-foreground'
              )}
              onToggleLanguage={handleToggleLanguage}
            />
            <AuthButton
              state={state}
              onLogout={onLogout}
              className={cn(
                navigationMenuTriggerStyle(),
                'h-full bg-transparent px-7 text-foreground transition-colors hover:bg-background hover:text-foreground hover:brightness-95',
                state !== State.Onboarding &&
                  'hidden xl:flex xl:text-primary-foreground hover:xl:bg-primary hover:xl:text-primary-foreground'
              )}
            />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
