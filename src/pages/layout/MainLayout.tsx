import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { Header } from '@/containers/common/Header/Header';
import { State } from '@/containers/common/Header/const/state';
import { LoginState } from '@/atoms/atom';
import { Footer } from '@/containers/common/Footer';
import { useAtom } from 'jotai';
import { getClientIdFromToken, postSsoLogout } from '@/apis/postSsoLogout';
import { baseUrl } from '@/pages/register/containers/const/data';

export function MainLayout() {
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
    const isSsoUser = !!localStorage.getItem('refreshToken');

    if (isSsoUser) {
      const refreshToken = localStorage.getItem('refreshToken') ?? '';
      const accessToken = localStorage.getItem('accessToken') ?? '';
      const clientId = getClientIdFromToken(accessToken);

      localStorage.clear();
      setLoginState(false);
      postSsoLogout({ refreshToken, clientId, redirectUri: baseUrl });
    } else {
      localStorage.clear();
      setLoginState(false);
      navigate('/');
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header state={loginState ? State.Login : State.Logout} onLogout={handleLogout} />
      <main className="mt-12 grow xl:mt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
