import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { LoginState } from '@/atoms/atom';
import { baseUrl } from '@/pages/register/containers/const/data';
import { useSetAtom } from 'jotai';
import { getStudentInfo } from '@/apis/getStudentInfo';
import axios from 'axios';
import { getClientIdFromToken, postSsoLogout } from '@/apis/postSsoLogout';

const SsoRedirect = () => {
  const setLoginState = useSetAtom(LoginState);
  const navigate = useNavigate();

  useEffect(() => {
    const handleSsoCallback = async () => {
      try {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        const tokensRaw = params.get('tokens');

        if (!tokensRaw) {
          alert('로그인에 실패했습니다');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('userData');
          navigate('/register', { replace: true });
          return;
        }

        // Set jwt tokens into localStorage
        const tokens = JSON.parse(decodeURIComponent(tokensRaw));
        const { id_token, refresh_token } = tokens;
        localStorage.setItem('accessToken', id_token);
        localStorage.setItem('refreshToken', refresh_token);

        // Remove tokens from URL to prevent exposure on back navigation
        window.history.replaceState(null, '', window.location.pathname);

        try {
          const response = await getStudentInfo();
          localStorage.setItem('userData', JSON.stringify(response));
        } catch (err) {
          if (axios.isAxiosError(err) && err.response?.status === 404) {
            navigate('/register/tos');
            return;
          } else {
            alert('로그인에 실패했습니다');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userData');
            navigate('/register', { replace: true });
            return;
          }
        }

        // redirect user to the baseUrl
        setLoginState(true);
        window.location.href = baseUrl;
      } catch (err) {
        console.error(err);
        alert('로그인에 실패했습니다');

        // Save values before clearing localStorage
        const refreshToken = localStorage.getItem('refreshToken') ?? '';
        const accessToken = localStorage.getItem('accessToken') ?? '';
        const clientId = getClientIdFromToken(accessToken);

        // Clear local tokens
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setLoginState(false);

        // Cognito logout
        postSsoLogout({
          refreshToken,
          clientId,
          redirectUri: baseUrl,
        });
      }
    };

    handleSsoCallback();
  }, [navigate, setLoginState]);

  return <div>Loading…</div>;
};

export default SsoRedirect;
