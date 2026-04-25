import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { LoginState } from '@/atoms/atom';
import { baseUrl } from '@/pages/register/containers/const/data';
import { useSetAtom } from 'jotai';
import { getStudentInfo } from '@/apis/getStudentInfo';
import axios from 'axios';
import { getClientIdFromToken, postSsoLogout } from '@/apis/postSsoLogout';
import { getManagerProfile } from '@/apis/getManagerProfile';

const managerClientId = import.meta.env.VITE_MANAGER_CLIENT_ID;
const userClientId = import.meta.env.VITE_USER_CLIENT_ID;

// clearAuthState removes auth related values in localStorage
function clearAuthState() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userData');
  localStorage.removeItem('groupCodeList');
  localStorage.removeItem('memberName');
  localStorage.removeItem('majorName');
}

// SsoRedirect processes the sso callback
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
          clearAuthState();
          navigate('/register', { replace: true });
          return;
        }

        // Verify all mandatory JWT tokens and audience are available
        const tokens = JSON.parse(decodeURIComponent(tokensRaw));
        const { id_token, refresh_token } = tokens;
        if (!id_token || !refresh_token ) {
          alert('로그인에 실패했습니다 1');
          clearAuthState();
          navigate('/register', { replace: true });
          return;
        }
        
        // Get audience from id_token
        const audience = getClientIdFromToken(id_token);
        if (!audience) {
          alert('로그인에 실패했습니다 2');
          clearAuthState();
          navigate('/register', { replace: true });
          return;
        }
        
        // Set JWT tokens in localStorage
        localStorage.setItem('accessToken', id_token);
        localStorage.setItem('refreshToken', refresh_token);
        // Remove tokens from URL fragment to prevent exposure on back navigation
        window.history.replaceState(null, '', window.location.pathname);
        
        if (audience === userClientId) { // Normal user sso callback process
          try {
            const response = await getStudentInfo();
            localStorage.setItem('userData', JSON.stringify(response));
          } catch (err) {
            // If user didn't onboard in SSO system
            if (axios.isAxiosError(err) && err.response?.status === 404) {
              navigate('/register/tos');
              return;
            } else {
              // If other unexpected error occurred
              alert('로그인에 실패했습니다 3');
              clearAuthState();
              navigate('/register', { replace: true });
              return;
            }
          }
          // redirect user to the baseUrl
          setLoginState(true);
          window.location.replace(baseUrl);
        } else if (audience === managerClientId) { // Manager account sso callback process
          // Fetch manager profile from backend
          const profile = await getManagerProfile();

          // Setup localStorage for manager
          localStorage.setItem('groupCodeList', JSON.stringify(profile.groupCodeList));
          if (profile.memberName) localStorage.setItem('memberName', profile.memberName);
          if (profile.majorName) localStorage.setItem('majorName', profile.majorName);
          setLoginState(true);
          window.location.replace(baseUrl);
          return;
        } else {
          // If audience is not in a whitelist
          alert('로그인에 실패했습니다 4');                                                                                                                                                                                                                                                                   
          clearAuthState();                                                                                                                                                                                                                                                                                 
          navigate('/register', { replace: true });                                                                                                                                                                                                                                                         
          return;
        }
      } catch (err) {
        console.error(err);
        alert('로그인에 실패했습니다 5');

        // Save values before clearing localStorage
        const refreshToken = localStorage.getItem('refreshToken') ?? '';
        const accessToken = localStorage.getItem('accessToken') ?? '';
        const clientId = getClientIdFromToken(accessToken);

        clearAuthState();
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
