import { useTranslation } from 'react-i18next';

export function KakaoButton() {
  const { i18n } = useTranslation();

  const isTrans = Boolean(i18n.language === 'en');

  return isTrans ? (
    <img src="/image/kakao_login_large_narrow_en.svg" alt="Kakao Login Button(English)" className="cursor-pointer" />
  ) : (
    <img src="/image/kakao_login_large_narrow.svg" alt="Kakao Login Button(Korean)" className="cursor-pointer" />
  );
}
