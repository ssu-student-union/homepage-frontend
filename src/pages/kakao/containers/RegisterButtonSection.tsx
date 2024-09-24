import { Link } from 'react-router-dom';
import { KakaoButton } from '@/components/Logo/KakaoButton';

const Rest_api_key = import.meta.env.VITE_REST_API_KEY;
const redirect_uri = import.meta.env.VITE_REDIRECT_URI;
// const encoded_redirect_uri = encodeURIComponent(redirect_uri);
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

const handleLogin = () => {
  window.location.href = KAKAO_AUTH_URL;
};

export function RegisterButtonSection() {
  return (
    <div
      style={{
        minHeight: '0vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        overflowY: 'hidden',
      }}
    >
      <div className="flex flex-col items-center text-center">
        <h1 className="mb-[-10px] text-xs font-normal">제64대 총학생회</h1>
        <h1 className="text-[56px] font-bold">US:SUM</h1>
        <div onClick={handleLogin}>
          <KakaoButton />
        </div>
        <Link to={'scouncil'}>
          <div className="mt-[20px] text-[12px] font-medium not-italic leading-[130%] text-[#828282] underline">
            학생자치기구 로그인
          </div>
        </Link>
      </div>
    </div>
  );
}
