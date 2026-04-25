import { baseUrl } from '@/pages/register/containers/const/data';
const new_redirect_uri = import.meta.env.VITE_NEW_REDIRECT_URI;

const SSO_AUTH_API = `https://dev-api.auth.sssupport.shop/auth/login?redirect_uri=${baseUrl}${new_redirect_uri}`

export function SsoLoginButton() {
  return (
    <button onClick={() => {                                                                                                                                                                                                                                                                                             
      localStorage.setItem('redirectUrl', window.location.href);
      window.location.href = SSO_AUTH_API;                                                                                                                                                                                                                                                                               
    }}>SSO 로그인</button>
  );
}
