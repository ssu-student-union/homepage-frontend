import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Header } from '@/containers/common/Header/Header';
import { State } from '@/containers/common/Header/const/state';
import { useSetRecoilState } from 'recoil';
import { LoginState } from '@/recoil/atoms/atom';

export function HeaderLayout() {
  const [headerState, setHeaderState] = useState(State.Logout);
  const setLoginState = useSetRecoilState(LoginState);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setLoginState(true);
    } else {
      setLoginState(false);
    }
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();

    setHeaderState(State.Logout);
    setLoginState(false);

    navigate('/');
  };

  return (
    <>
      <Header state={headerState ? State.Login : State.Logout} onLogout={handleLogout} />
      <main>
        <Outlet />
      </main>
    </>
  );
}
