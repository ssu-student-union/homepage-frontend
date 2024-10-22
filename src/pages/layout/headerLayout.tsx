import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Header } from '@/containers/common/Header/Header';
import { State } from '@/containers/common/Header/const/state';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { LoginState } from '@/recoil/atoms/atom';
import { Footer } from '@/containers/common/Footer/Footer';

export function Layout() {
  const loginState = useRecoilValue(LoginState);
  const setLoginState = useSetRecoilState(LoginState);
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
    // 임시로 메인 라우팅 /beta로 변경
    navigate('/');
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header state={loginState ? State.Login : State.Logout} onLogout={handleLogout} />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
