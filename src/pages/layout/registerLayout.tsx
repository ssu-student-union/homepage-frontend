import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { Header } from '@/containers/common/Header/Header';
import { State } from '@/containers/common/Header/const/state';
import { LoginState } from '@/atoms/atom';
import { useAtom } from 'jotai';

export function RegisterLayout() {
  const [loginState, setLoginState] = useAtom(LoginState);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setLoginState(true);
    } else {
      setLoginState(false);
    }
  }, [setLoginState]);

  const handleLogout = () => {
    localStorage.clear();
    setLoginState(false);
    navigate('/');
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header state={loginState ? State.Login : State.Logout} onLogout={handleLogout} />
      <main className="grow">
        <Outlet />
      </main>
    </div>
  );
}
