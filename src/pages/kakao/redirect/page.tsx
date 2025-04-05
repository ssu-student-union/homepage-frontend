import { State } from '@/containers/common/Header/const/state';
import { Header } from '@/containers/common/Header/Header';
import { RegisterButtonSection } from '@/pages/kakao/containers/RegisterButtonSection';
import { RegisterTextSection } from '@/pages/kakao/containers/RegisterTextSection';
import { useSearchParams } from 'react-router';

export function KakaoRegisterRedirectPage() {
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get('redirect');

  if (redirectUrl) {
    localStorage.setItem('redirectUrl', redirectUrl);
  }

  return (
    <>
      <Header state={State.Onboarding} />
      <div className="relative h-screen overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-[20%] mt-[100px] -translate-x-1/2 -translate-y-1/2">
          <RegisterTextSection />
        </div>
        <div className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
          <RegisterButtonSection />
        </div>
        <div className="pointer-events-none absolute left-1/2 top-full mt-[-100px] -translate-x-1/2 -translate-y-1/2">
          <RegisterTextSection />
        </div>
      </div>
    </>
  );
}
