import { cn } from '@/libs/utils';
import { State } from '../const/state';
import { getStyles } from '../const/style';
import { useNavigate } from 'react-router-dom';

interface AuthButtonProps {
  state?: State;
}

export function AuthButton({ state = State.Onboarding }: AuthButtonProps) {
  const styles = getStyles(state);
  const navigate = useNavigate();

  if (state === State.Login) {
    return (
      <div className={cn(styles.headerItemStyle, 'w-[120px] text-base xs:hidden sm:hidden md:hidden lg:hidden')}>
        내정보
      </div>
    );
  }
  if (state === State.Logout) {
    return (
      <button
        className={cn(styles.headerItemStyle, 'w-[120px] text-base xs:hidden sm:hidden md:hidden lg:hidden')}
        onClick={() => navigate('/homepage-frontend/register')}
      >
        로그인
      </button>
    );
  }
  if (state === State.Onboarding) return null;

  return null;
}
