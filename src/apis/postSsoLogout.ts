interface SsoLogoutParams {
  refreshToken: string;
  clientId: string;
  redirectUri: string;
}

const ssoBaseUrl = import.meta.env.VITE_SSO_API_URL;
const logoutUrl = new URL('auth/logout', ssoBaseUrl).toString();

export function getClientIdFromToken(token: string): string {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) {
      return '';
    }
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const pad = base64.length % 4;
    if (pad) {
      base64 += '='.repeat(4 - pad);
    }
    const payload = JSON.parse(atob(base64));
    return payload.aud ?? payload.client_id ?? '';
  } catch {
    return '';
  }
}

export const postSsoLogout = ({ refreshToken, clientId, redirectUri }: SsoLogoutParams) => {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = logoutUrl;

  const fields = {
    refresh_token: refreshToken,
    client_id: clientId,
    redirect_uri: redirectUri,
  };

  for (const [key, value] of Object.entries(fields)) {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = value;
    form.appendChild(input);
  }

  document.body.appendChild(form);
  form.submit();
};
