import { State } from '@/containers/common/Header/const/state';
import { Header } from '@/containers/common/Header/Header';
import { RegisterButtonSection } from '@/pages/kakao/containers/RegisterButtonSection';
import { RegisterTextSection } from '@/pages/kakao/containers/RegisterTextSection';
import { redirectState } from '@/recoil/redirect/RedirectState';
import { useSearchParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

export function KakaoRegisterRedirectPage() {
  const [searchParams] = useSearchParams();
  const setRedirect = useSetRecoilState(redirectState);
  const redirectUrl = searchParams.get('redirect');

  if (redirectUrl) {
    setRedirect(redirectUrl);
  }

  console.log('redirect값 제대로 받는지 : ', redirectUrl);

  return (
    <>
      <Header state={State.Onboarding} />
      <div className="relative h-screen overflow-hidden">
        <div className="top-1/5 pointer-events-none absolute left-1/2 mt-[100px] -translate-x-1/2 -translate-y-1/2 transform">
          <RegisterTextSection />
        </div>
        <div className="z-99 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <RegisterButtonSection isRedirect={true} />
        </div>
        <div className="pointer-events-none absolute left-1/2 top-full mt-[-100px] -translate-x-1/2 -translate-y-1/2 transform">
          <RegisterTextSection />
        </div>
      </div>
    </>
  );
}
