import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { kakaoAuthCodeApi } from '@/apis/kakaoLoginApi';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { LoginState } from '@/recoil/atoms/atom';
import { redirectState } from '@/recoil/redirect/RedirectState';

const KakaoRedirect = () => {
  const setLoginState = useSetRecoilState(LoginState);
  const AUTHORIZE_CODE: string = new URLSearchParams(window.location.search).get('code')!;

  const navigate = useNavigate();

  const redirectUrl = useRecoilValue(redirectState);

  useEffect(() => {
    const kakaoLogin = async () => {
      try {
        const response = await kakaoAuthCodeApi(AUTHORIZE_CODE);
        const res = response.data;
        const accessToken = response.data.data.accessToken;
        localStorage.setItem('kakaoData', JSON.stringify(res));
        localStorage.setItem('accessToken', accessToken);

        if (res.code === '200') {
          // 최초 회원가입 유저의 경우 약관 동의가 필요
          if (res.data.isFirst) {
            navigate('/register/tos'); // 최초 회원가입 유저는 약관 동의 화면으로 이동
          } else {
            if (redirectUrl != 'is-student-union') {
              const separator = redirectUrl.includes('?') ? '&' : '?';
              const newRedirectUrl = `${redirectUrl}${separator}accessToken=${encodeURIComponent(accessToken)}`;
              window.location.href = newRedirectUrl;
            } else {
              // 임시로 메인 라우팅 /beta로 변경
              window.location.href = 'https://stu.ssu.ac.kr/'; // 이미 가입된 유저는 메인 화면으로 이동
              setLoginState(true);
            }
          }
        } else {
          alert('로그인에 실패했습니다');
        }
      } catch (err) {
        console.log(err);
      }
    };

    kakaoLogin();
  }, [AUTHORIZE_CODE, navigate, setLoginState]);

  return <div>Loading…</div>;
};

export default KakaoRedirect;
