import { cn } from '@/libs/utils';
import { State } from '../const/state';
import { getStyles } from '../const/style';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            className={cn(
              styles.headerItemStyle,
              'w-[9rem] cursor-pointer text-base max-xl:hidden'
            )}
          >
            {t('header.내정보')}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="rounded-xs border-none bg-[#2F4BF7] text-white max-xl:hidden"
        >
          <DropdownMenuItem asChild>
            <Link to="/mypage" className="block w-full px-4 py-3 text-center hover:bg-blue-700">
              {t('introduction.마이페이지')}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/service-notice" className="block w-full px-4 py-3 text-center hover:bg-blue-700">
              {t('header-items.서비스 공지사항')}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={onLogout} className="cursor-pointer px-4 py-3 text-center hover:bg-blue-700">
            {t('header.로그아웃')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  if (state === State.Logout) {
    return (
      <button
        className={cn(styles.headerItemStyle, 'w-[9rem] text-base max-xl:hidden')}
        onClick={() => navigate('/register')}
      >
        {t('header.로그인')}
      </button>
    );
  }
  if (state === State.Onboarding) return null;

  return null;
}
