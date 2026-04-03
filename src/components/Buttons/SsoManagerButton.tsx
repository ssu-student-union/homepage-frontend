import { baseUrl } from '@/pages/register/containers/const/data';

const sso_base_url = import.meta.env.VITE_SSO_API_URL;
const new_redirect_uri = import.meta.env.VITE_NEW_REDIRECT_URI;

const SSO_MANAGER_AUTH_API = `${sso_base_url}auth/manager/login?redirect_uri=${baseUrl}${new_redirect_uri}`;

export function SsoManagerLoginButton() {
  return (
    <button
      onClick={() => {
        localStorage.setItem('redirectUrl', window.location.href);
        window.location.href = SSO_MANAGER_AUTH_API;
      }}
    >
      SSO 매니저 로그인
    </button>
  );
}
