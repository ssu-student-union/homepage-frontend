export const moveToPASSU = (redirectUrl: string, accessToken: string) => {
  const separator = redirectUrl.includes('?') ? '&' : '?';
  const newRedirectUrl = `${redirectUrl}${separator}accessToken=${encodeURIComponent(accessToken)}`;
  localStorage.removeItem('redirectUrl');
  localStorage.removeItem('kakaoData');
  window.location.href = newRedirectUrl;
};
