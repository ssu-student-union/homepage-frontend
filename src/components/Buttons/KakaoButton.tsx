import { useTranslation } from 'react-i18next';

export function KakaoButton() {
  const { i18n } = useTranslation();

  const isTrans = i18n.language === 'en';

  return isTrans ? (
    <img src="/image/kakao_login_large_narrow_en.svg" alt="Login with Kakao" className="cursor-pointer" />
  ) : (
    <img src="/image/kakao_login_large_narrow.svg" alt="카카오 로그인" className="cursor-pointer" />
  );
}
