import { LoginState } from '@/atoms/atom';
import { useAtom } from 'jotai';
import { useLocation, useNavigate } from 'react-router';

export function useConditionalNavigate() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin] = useAtom(LoginState);

  const handleNavigate = (path: string) => {
    if (isLogin) {
      navigate(path);
    } else {
      navigate('/register', {
        state: { from: location.pathname },
      });
    }
  };

  return { handleNavigate };
}
