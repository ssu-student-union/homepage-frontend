import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { kakaoAuthCodeApi } from '@/apis/kakaoLoginApi';
import { useSetRecoilState } from 'recoil';
import { LoginState } from '@/recoil/atoms/atom';

const KakaoRedirect = () => {
  const setLoginState = useSetRecoilState(LoginState);
  const AUTHORIZE_CODE: string = new URLSearchParams(window.location.search).get('code')!;

  const urlParams = new URLSearchParams(window.location.search);

  const redirect_url = urlParams.get('subServiceUrl');
  console.log(redirect_url);

  const navigate = useNavigate();

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
            // 외부 학생 서비스에서 카카오로그인 이용 시 redirection 처리
            if (redirect_url!) {
              // redirect_url에 accessToken 심기
              const separator = redirect_url.includes('?') ? '&' : '?';
              const new_redirect_url = `${redirect_url}${separator}accessToken=${accessToken}`;
              // 토큰이 심어진 redirect_url로 이동
              window.location.href = new_redirect_url;
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
