import { cn } from '@/libs/utils';
import { State } from '../const/state';
import { getStyles } from '../const/style';

interface AuthButtonProps {
  state?: State;
}

export function AuthButton({ state = State.Onboarding }: AuthButtonProps) {
  const styles = getStyles(state);

  if (state == State.Login) {
    return <div className={cn(styles.headerItemStyle, 'w-[120px] text-base')}>내정보</div>;
  }
  if (state == State.Logout) {
    return <div className={cn(styles.headerItemStyle, 'w-[120px] text-base')}>로그인</div>;
  }
  if (state == State.Onboarding) return null;
}
