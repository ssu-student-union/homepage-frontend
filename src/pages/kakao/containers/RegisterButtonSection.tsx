import { Link } from 'react-router';
import { KakaoButton } from '@/components/Buttons/KakaoButton';
import { baseUrl } from '@/pages/kakao/containers/const/data';
import { useTranslation } from 'react-i18next';
import { STUDENT_COUNCIL_NAME } from '@/const/studentCouncil';
const rest_api_key = import.meta.env.VITE_REST_API_KEY;
const redirect_uri = import.meta.env.VITE_REDIRECT_URI;
const TAG = ['ussum_001', 'ussum_002', 'ussum_003'];

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${rest_api_key}&redirect_uri=${baseUrl}${redirect_uri}&service_terms=${TAG}`;

const handleLogin = () => {
  window.location.href = KAKAO_AUTH_URL;
};

export function RegisterButtonSection() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center text-center">
        <h1 className="mb-[-10px] text-xs font-normal">{t('onboarding.제65대 총학생회')}</h1>
        <h1 className="text-[56px] font-bold">{STUDENT_COUNCIL_NAME}</h1>
        <div onClick={handleLogin}>
          <KakaoButton />
        </div>
        <Link to={'/register/scouncil'}>
          <div className="mt-[20px] text-[12px] font-medium not-italic leading-[130%] text-[#828282] underline">
            {t('onboarding.학생자치기구 로그인')}
          </div>
        </Link>
      </div>
    </div>
  );
}
