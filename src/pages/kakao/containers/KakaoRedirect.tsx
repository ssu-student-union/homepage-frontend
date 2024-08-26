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
        localStorage.setItem('kakaoData', JSON.stringify(res));

        if (res) {
          // res.data 객체에 name과 studentId가 존재하는지 확인
          if (res.data?.name && res.data?.studentId) {
            navigate('/'); // 조건을 만족하면 홈으로 이동
          } else {
            navigate('/register/onboarding'); // 조건을 만족하지 않으면 onboarding 페이지로 이동
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    kakaoLogin();
  }, [AUTHORIZE_CODE, navigate]);

  return <div>Loading...</div>;
};

export default KakaoRedirect;
