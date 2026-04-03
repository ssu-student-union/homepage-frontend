interface SsoLogoutParams {
  refreshToken: string;
  clientId: string;
  redirectUri: string;
}

export function getClientIdFromToken(token: string): string {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(base64));
    return payload.aud ?? payload.client_id ?? '';
  } catch {
    return '';
  }
}

export const postSsoLogout = ({ refreshToken, clientId, redirectUri }: SsoLogoutParams) => {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = 'https://dev-api.auth.sssupport.shop/auth/logout';

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
