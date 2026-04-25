import { useEffect, useMemo } from 'react';
import { LoginState } from '@/atoms/atom';                                                                                                                                                                                                                                                          
import { baseUrl } from '@/pages/register/containers/const/data';                                                                                                                                                                                                                                   
import { useSetAtom } from 'jotai';

const SsoRedirect = () => {
    const setLoginState = useSetAtom(LoginState);
    const redirectUrl = useMemo(() => localStorage.getItem('redirectUrl'), []);                                                                                                                                                                                                                       
   
    useEffect(() => {                                                                                                                                                                                                                                                                                 
      const handleSsoCallback = async () => {
        try {
          const hash = window.location.hash.substring(1);
          const params = new URLSearchParams(hash);                                                                                                                                                                                                                                                   
          const tokensRaw = params.get('tokens');
                                                                                                                                                                                                                                                                                                      
          if (!tokensRaw) {
            alert('로그인에 실패했습니다');
            return;                                                                                                                                                                                                                                                                                   
          }
                                                                                                                                                                                                                                                                                                      
          const tokens = JSON.parse(decodeURIComponent(tokensRaw));
          const { id_token, refresh_token } = tokens;

          // TODO: Check onboarding status via GET /auth/me                                                                                                                                                                                                                                           
        
          // Set jwt tokens into localStorage
          localStorage.setItem('accessToken', id_token);
          localStorage.setItem('refreshToken', refresh_token);

          // redirect user to the baseUrl
          setLoginState(true);
          window.location.href = baseUrl;
        } catch (err) {                                                                                                                                                                                                                                                                               
          console.error(err);
          alert('로그인에 실패했습니다');                                                                                                                                                                                                                                                             
        }         
      };

      handleSsoCallback();
    }, [setLoginState, redirectUrl]);

    return <div>Loading…</div>;                                                                                                                                                                                                                                                                       
};

export default SsoRedirect;
