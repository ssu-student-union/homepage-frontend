import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { baseUrl } from '@/pages/register/containers/const/data';
const rest_api_key = import.meta.env.VITE_REST_API_KEY;
const redirect_uri = import.meta.env.VITE_REDIRECT_URI;
// 카카오 로그인 리다이렉트 수정되면 경로 마꿔야함 - 학생회 이름 안 바뀜
const TAG = ['ussum_001', 'ussum_002', 'ussum_003'];

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${rest_api_key}&redirect_uri=${baseUrl}${redirect_uri}&service_terms=${TAG}`;

export function KakaoButton() {
  const { i18n } = useTranslation();

  const isTrans = i18n.language === 'en';

  return (
    <Link to={KAKAO_AUTH_URL}>
      {isTrans ? (
        <img src="/image/kakao_login_large_narrow_en.svg" alt="Login with Kakao" className="cursor-pointer" />
      ) : (
        <img src="/image/kakao_login_large_narrow.svg" alt="카카오 로그인" className="cursor-pointer" />
      )}
    </Link>
  );
}
