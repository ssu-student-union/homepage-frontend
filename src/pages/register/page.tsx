import { useEffect } from 'react';
import { RegisterButtonSection } from '@/pages/register/containers/RegisterButtonSection';
import { RegisterTextSection } from '@/pages/register/containers/RegisterTextSection';
import { baseUrl } from '@/pages/register/containers/const/data';

export function KakaoRegisterPage() {
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      window.location.replace(baseUrl);
    }
  }, []);

  return (
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
  );
}
