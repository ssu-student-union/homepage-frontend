import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { Header } from '@/containers/common/Header/Header';
import { State } from '@/containers/common/Header/const/state';
import { LoginState } from '@/atoms/atom';
import { Footer } from '@/containers/common/Footer';
import { useAtom } from 'jotai';
import { getClientIdFromToken, postSsoLogout } from '@/apis/postSsoLogout';
import { baseUrl } from '@/pages/register/containers/const/data';
import { useGetStudentInfo } from '@/hooks/new/query/useGetStudentInfo';

const userClientId = import.meta.env.VITE_USER_CLIENT_ID;

export function MainLayout() {
  const [loginState, setLoginState] = useAtom(LoginState);
  const navigate = useNavigate();

  const accessToken = localStorage.getItem('accessToken');
  const isSsoUser = !!localStorage.getItem('refreshToken');
  const isStudent = accessToken ? getClientIdFromToken(accessToken) === userClientId : false;

  const { isError, isLoading } = useGetStudentInfo({
    queryOptions: {
      enabled: !!accessToken && isSsoUser && isStudent,
      retry: false,
    },
  });
  useEffect(() => {
    if (isError) {
      navigate('/register/tos', { replace: true });
    }
  }, [isError, navigate]);

  useEffect(() => {
    if (accessToken) {
      setLoginState(true);
    } else {
      setLoginState(false);
    }
  }, [accessToken, setLoginState]);

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

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="size-[25px] animate-spin rounded-full border-[3px] border-[#2F4BF7] border-t-transparent"></div>
      </div>
    );
  }

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
