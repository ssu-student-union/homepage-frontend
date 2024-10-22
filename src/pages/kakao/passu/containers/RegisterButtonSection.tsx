import { KakaoButton } from '@/components/Logo/KakaoButton';

const rest_api_key = import.meta.env.VITE_REST_API_KEY;
const redirect_uri = import.meta.env.VITE_REDIRECT_URI;
const baseUrl = `${window.location.protocol}//${window.location.host}/`;
const TAG = ['ussum_001', 'ussum_002', 'ussum_003'];

interface type {
  subServiceUrl: string;
}

export function RegisterButtonSection({ subServiceUrl }: type) {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${rest_api_key}&redirect_uri=${baseUrl}${redirect_uri}&service_terms=${TAG}&subServiceUrl=${subServiceUrl}`;

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

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
      </div>
    </div>
  );
}
