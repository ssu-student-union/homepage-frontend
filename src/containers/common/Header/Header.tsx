import { cn } from '@/libs/utils';
import { List } from '@phosphor-icons/react';
import { Logo } from '@/components/Logo/UssumLogo';
import { getStyles } from './const/style';
import { HeaderSheet } from './component/HeaderSheet';
import { AuthButton } from './component/AuthButton';
import { State } from './const/state';
import { Navigation } from './component/Navigation';
import { Link } from 'react-router-dom';
import { useHeaderSize } from '@/hooks/useHeaderSize';

interface HeaderProps {
  state?: State;
  onLogout?: () => void;
}

export function Header({ state = State.Onboarding, onLogout = () => {} }: HeaderProps) {
  const styles = getStyles(state);
  const isSmall = useHeaderSize();
  return (
    <div
      className={cn(
        'fixed top-0 flex h-[60px] w-[100vw] justify-start xs:h-[50px] sm:h-[50px] md:h-[50px] xl:justify-between xxl:justify-between',
        styles.bgColor
      )}
      style={{ zIndex: 100 }}
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
          <div className="flex items-center gap-4">
            <Logo size={isSmall ? '23px' : '46px'} fill={styles.fillColor} />
            <span className={cn(styles.textColor, 'min-w-fit text-[20px] text-lg font-bold')}>US:SUM</span>
          </div>
        </Link>
      </div>
      <Navigation state={state} />
      <div className="flex pr-4">
        <AuthButton state={state} onLogout={onLogout} />
      </div>
    </div>
  );
}
