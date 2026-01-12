import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { kakaoAuthCodeApi } from '@/apis/kakaoLoginApi';
import { LoginState } from '@/atoms/atom';
import { baseUrl } from '@/pages/register/containers/const/data';
import { useSetAtom } from 'jotai';
import { moveToRedirectUrl } from '@/pages/register/containers/utils/moveToRedirectUrl';

const KakaoRedirect = () => {
  const setLoginState = useSetAtom(LoginState);
  const AUTHORIZE_CODE: string = new URLSearchParams(window.location.search).get('code')!;
  const navigate = useNavigate();

  // ✅ useMemo를 사용하여 redirectUrl을 고정 (렌더링마다 값이 변하는 문제 방지)
  const redirectUrl = useMemo(() => localStorage.getItem('redirectUrl'), []);

  useEffect(() => {
    const kakaoLogin = async () => {
      try {
        const response = await kakaoAuthCodeApi(AUTHORIZE_CODE);
        const res = response.data;
        const accessToken = response.data.data.accessToken;

        if (res.code === '200') {
          localStorage.setItem('kakaoData', JSON.stringify(res));
          // 최초 회원가입 유저의 경우 약관 동의가 필요
          if (res.data.isFirst) {
            navigate('/register/tos'); // 최초 회원가입 유저는 약관 동의 화면으로 이동
          } else {
            if (redirectUrl !== null) {
              moveToRedirectUrl(redirectUrl, accessToken);
            } else {
              // 최초 회원가입 or 타 사이트 로그인이 아니라면 accessToken 로컬에 저장
              localStorage.setItem('accessToken', accessToken);
              window.location.href = baseUrl; // 이미 가입된 유저는 메인 화면으로 이동
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
  }, [AUTHORIZE_CODE, navigate, setLoginState, redirectUrl]);

  return <div>Loading…</div>;
};

export default KakaoRedirect;
