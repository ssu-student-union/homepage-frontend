import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { kakaoAuthCodeApi } from '@/apis/kakaoLoginApi';

const KakaoRedirect = () => {
  const AUTHORIZE_CODE: string = new URLSearchParams(window.location.search).get('code')!;

  const navigate = useNavigate();

  useEffect(() => {
    const kakaoLogin = async () => {
      try {
        console.log(AUTHORIZE_CODE);
        const response = await kakaoAuthCodeApi(AUTHORIZE_CODE);
        console.log(response);
        const res = response.data;
        const accessToken = response.data.data.accessToken;
        localStorage.setItem('kakaoData', JSON.stringify(res));
        localStorage.setItem('accessToken', accessToken);

        navigate('/register/onboarding');
      } catch (err) {
        console.log(err);
      }
    };

    kakaoLogin();
  }, [AUTHORIZE_CODE, navigate]);

  return <div>Loading...</div>;
};

export default KakaoRedirect;
