import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/containers/common/Header/Header';
import { State } from '@/containers/common/Header/const/state';
import { useRecoilState } from 'recoil';
import { loginState } from '@/recoil/atoms/atom';

export function HeaderLayout() {
  const [isLogin, setIsLoggedIn] = useRecoilState(loginState);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
  };

  return (
    <>
      <Header state={isLogin ? State.Login : State.Logout} onLogout={handleLogout} />
      <main>
        <Outlet />
      </main>
    </>
  );
}
