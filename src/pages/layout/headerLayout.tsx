import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { Header } from '@/containers/common/Header/Header';
import { State } from '@/containers/common/Header/const/state';
import { LoginState } from '@/atoms/atom';
import { Footer } from '@/containers/common/Footer';
import { useAtom } from 'jotai';

export function Layout() {
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
      <Footer />
    </div>
  );
}
