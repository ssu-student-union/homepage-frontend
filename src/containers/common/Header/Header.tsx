import { useIsMobile } from '@/hooks/useIsMobile';
import { cn } from '@/libs/utils';
import { List } from '@phosphor-icons/react';
import { Logo } from '@/components/Logo/Logo';
import { getStyles } from './const/style';
import { HeaderSheet } from './component/HeaderSheet';
import { AuthButton } from './component/AuthButton';
import { State } from './const/state';
import { Navigation } from './component/Navigation';
import { Link } from 'react-router-dom';

interface HeaderProps {
  state?: State;
}

export function Header({ state = State.Onboarding }: HeaderProps) {
  const isMobile = useIsMobile();
  const styles = getStyles(state);

  return (
    <div
      className={cn(
        'fixed top-0 h-[60px] w-[100vw] xs:h-[50px] sm:h-[50px]',
        isMobile ? 'flex justify-start' : 'flex justify-between',
        styles.bgColor
      )}
      style={{ zIndex: 100 }}
    >
      {isMobile && (
        <HeaderSheet
          trigger={
            <div className={cn(styles.headerItemStyle, 'px-3 text-base')}>
              <List size={28} />
            </div>
          }
        />
      )}
      <Link to="/" className="flex">
        <div className={cn(styles.headerItemStyle, { 'px-0.5': isMobile })}>
          <div className="flex items-center gap-4">
            <Logo size={isMobile ? '23px' : '46px'} fill={styles.fillColor} />
            <span className={cn(styles.textColor, 'min-w-fit text-[20px] text-lg font-bold')}>US:SUM</span>
          </div>
        </div>
        {!isMobile && <Navigation state={state} />}
      </Link>
      {!isMobile && (
        <div className="flex pr-4">
          <AuthButton />
        </div>
      )}
    </div>
  );
}
