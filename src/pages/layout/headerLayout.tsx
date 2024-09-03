import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/containers/common/Header/Header';
import { State } from '@/containers/common/Header/const/state';

export function HeaderLayout() {
  const [headerState, setHeaderState] = useState(State.Logout);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setHeaderState(State.Login);
    } else {
      setHeaderState(State.Logout);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setHeaderState(State.Logout);
  };

  return (
    <>
      <Header state={headerState} onLogout={handleLogout} />
      <main>
        <Outlet />
      </main>
    </>
  );
}
