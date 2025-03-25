import { cn } from '@/libs/utils';
import { List } from '@phosphor-icons/react';
import { getStyles } from './const/style';
import { HeaderSheet } from './component/HeaderSheet';
import { AuthButton } from './component/AuthButton';
import { State } from './const/state';
import { Navigation } from './component/Navigation';
import { Link } from 'react-router-dom';
import { useHeaderSize } from '@/hooks/useHeaderSize';
import SsureLogo from '@/components/Logo/SsureLogo';
import i18n from '@/translate/i18n';
import { TranslateButton } from '@/components/Buttons/TranslateButton';

interface HeaderProps {
  state?: State;
  onLogout?: () => void;
}

export function Header({ state = State.Onboarding, onLogout = () => {} }: HeaderProps) {
  const styles = getStyles(state);
  const isSmall = useHeaderSize();

  // 언어 변경 함수
  const handleToggleLanguage = () => {
    const newLang = i18n.language === 'ko' ? 'en' : 'ko';
    i18n.changeLanguage(newLang);
    localStorage.setItem('lang', newLang);
  };
  return (
    <div
      className={cn(
        'fixed top-0 z-50 flex h-[60px] w-[100vw] justify-start xs:h-[50px] sm:h-[50px] md:h-[50px] xl:justify-between xxl:justify-between',
        styles.bgColor
      )}
    >
      <HeaderSheet
        trigger={
          <div className={cn(styles.headerItemStyle, 'px-[1.25rem] text-base')}>
            <List size="1.5rem" />
          </div>
        }
      />
      <div className={cn(styles.headerItemStyle, 'xs:px-0.5 sm:px-0.5 md:px-0.5 lg:px-0.5')}>
        <Link to="/">
          <div className="flex items-center">
            {state === State.Onboarding ? (
              <SsureLogo.Dark className={isSmall ? 'size-[68px]' : 'size-[88px]'} />
            ) : (
              <SsureLogo className={isSmall ? 'size-[64px]' : 'size-[72px]'} />
            )}
          </div>
        </Link>
      </div>
      <Navigation state={state} />

      <div
        className="flex h-full items-center justify-center pr-4 xs:w-full 
  xs:justify-end sm:w-full
  sm:justify-end
  md:w-full md:justify-end lg:w-full lg:justify-end"
      >
        <TranslateButton
          className={cn(state === State.Onboarding && 'bg-white text-black hover:bg-gray-50')}
          onToggleLanguage={handleToggleLanguage}
        />
        <AuthButton state={state} onLogout={onLogout} />
      </div>
    </div>
  );
}
