import { State } from '@/containers/common/Header/const/state';
import { Header } from '@/containers/common/Header/Header';
import { RegisterTextSection } from '@/pages/kakao/containers/RegisterTextSection';
import { RegisterButtonSection } from './containers/RegisterButtonSection';
import { useParams } from 'react-router-dom';

export function KakaoRegisterRedirectPage() {
  let { redirect_url } = useParams();

  if (redirect_url === undefined) {
    redirect_url = 'https://ssuketch60.cafe24.com/';
  }

  return (
    <>
      <Header state={State.Onboarding} />
      <div className="relative h-screen overflow-hidden">
        <div className="top-1/5 pointer-events-none absolute left-1/2 mt-[100px] -translate-x-1/2 -translate-y-1/2 transform">
          <RegisterTextSection />
        </div>
        <div className="z-99 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <RegisterButtonSection subServiceUrl={redirect_url} />
        </div>
        <div className="pointer-events-none absolute left-1/2 top-full mt-[-100px] -translate-x-1/2 -translate-y-1/2 transform">
          <RegisterTextSection />
        </div>
      </div>
    </>
  );
}
