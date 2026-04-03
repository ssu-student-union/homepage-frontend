import { baseUrl } from '@/pages/register/containers/const/data';

const sso_base_url = import.meta.env.VITE_SSO_API_URL;
const new_redirect_uri = import.meta.env.VITE_NEW_REDIRECT_URI;

const ssoAuthUrl = new URL('auth/login', sso_base_url);
ssoAuthUrl.searchParams.set('redirect_uri', `${baseUrl}${new_redirect_uri}`);
const SSO_AUTH_API = ssoAuthUrl.toString();

export function SsoLoginButton() {
  return (
    <button
      onClick={() => {
        localStorage.setItem('redirectUrl', window.location.href);
        window.location.href = SSO_AUTH_API;
      }}
    >
      SSO 로그인
    </button>
  );
}
