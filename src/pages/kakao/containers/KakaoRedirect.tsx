import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { kakaoAuthCodeApi } from './apis/kakaoLoginApi';
import { kakakLoginState, loginState } from '@/recoil/atoms';

const KakaoRedirect = () => {
  const setIsLogin = useSetRecoilState(loginState);
  const setKakaoLogin = useSetRecoilState(kakakLoginState);
  const AUTHORIZE_CODE: string = new URLSearchParams(window.location.search).get('code')!;

  const navigate = useNavigate();

  useEffect(() => {
    const kakaoLogin = async () => {
      try {
        console.log(AUTHORIZE_CODE);
        const response = await kakaoAuthCodeApi(AUTHORIZE_CODE);
        console.log(response);
        const res = response.data;
        // JSON 문자열로 변환하여 저장
        localStorage.setItem('kakaoData', JSON.stringify(res));

        navigate('/register/onboarding');

        if (typeof response.data === 'string') {
          const accessToken = response.data.data.accessToken;
          localStorage.setItem('accessToken', accessToken);
          setIsLogin(true);
          setKakaoLogin(true);
          navigate('/register/onboarding');
          return;
        }
      } catch (err) {
        console.log(err);
      }
    };

    kakaoLogin();
  }, [AUTHORIZE_CODE, navigate, setIsLogin, setKakaoLogin]);

  return <div>Loading...</div>;
};

export default KakaoRedirect;
