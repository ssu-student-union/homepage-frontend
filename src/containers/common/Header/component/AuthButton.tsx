import { cn } from '@/libs/utils';
import { State } from '../const/state';
import { getStyles } from '../const/style';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface AuthButtonProps {
  state?: State;
  onLogout: () => void;
}

export function AuthButton({ state = State.Onboarding, onLogout }: AuthButtonProps) {
  const styles = getStyles(state);
  const navigate = useNavigate();
  const { t } = useTranslation();

  if (state === State.Login) {
    return (
      <div
        className={cn(styles.headerItemStyle, 'w-[9rem] text-base xs:hidden sm:hidden md:hidden lg:hidden')}
        onClick={onLogout}
      >
        {t('header.로그아웃')}
      </div>
    );
  }
  if (state === State.Logout) {
    return (
      <button
        className={cn(styles.headerItemStyle, 'w-[9rem] text-base xs:hidden sm:hidden md:hidden lg:hidden')}
        onClick={() => navigate('/register')}
      >
        {t('header.로그인')}
      </button>
    );
  }
  if (state === State.Onboarding) return null;

  return null;
}
