import { cn } from '@/libs/utils';
import { State } from '../const/state';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button, buttonVariants } from '@/components/ui/button';

interface AuthButtonProps {
  className?: string;
  state?: State;
  onLogout: () => void;
}

export function AuthButton({ className, state = State.Onboarding, onLogout }: AuthButtonProps) {
  const { t } = useTranslation();

  if (state === State.Login) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={cn('w-[9rem] cursor-pointer text-base max-xl:hidden xl:text-primary-foreground', className)}
          >
            {t('header.내정보')}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="rounded-xs border-none bg-primary text-white max-xl:hidden">
          <DropdownMenuItem asChild>
            <Link to="/mypage" className="block w-full px-4 py-3 text-center hover:bg-primary">
              {t('introduction.마이페이지')}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/service-notice" className="block w-full px-4 py-3 text-center hover:bg-primary">
              {t('header-items.서비스 공지사항')}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={onLogout} className="cursor-pointer px-4 py-3 text-center hover:bg-primary">
            {t('header.로그아웃')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  if (state === State.Logout) {
    return (
      <Link
        className={cn(buttonVariants({ variant: 'ghost' }), 'xl:text-primary-foreground', className)}
        to="/register"
      >
        {t('header.로그인')}
      </Link>
    );
  }
  if (state === State.Onboarding) return null;

  return null;
}
