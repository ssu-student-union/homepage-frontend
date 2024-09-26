import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Header } from '@/containers/common/Header/Header';
import { State } from '@/containers/common/Header/const/state';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { LoginState } from '@/recoil/atoms/atom';

export function HeaderLayout() {
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
    navigate('/');
  };

  return (
    <>
      <Header state={loginState ? State.Login : State.Logout} onLogout={handleLogout} />
      <main>
        <Outlet />
      </main>
    </>
  );
}
