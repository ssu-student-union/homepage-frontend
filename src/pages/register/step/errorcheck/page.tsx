import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

export function CertifyErrorPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleToMain = () => {
    navigate('/');
  };
  return (
    <div className="mt-[260px] flex flex-col items-center justify-center text-center">
      <div className="flex justify-center">
        <img src="/image/certify-error.svg" alt="certify-error" />
      </div>
      <div className="text-[22px] font-bold md:text-[32px]">{t('onboarding.문의가 접수되었습니다')}</div>
      <div className="mt-[12px] whitespace-pre-line text-[11px] font-medium md:text-base">
        {t('onboarding.error_check_description')}
      </div>
      <Button onClick={handleToMain} className="mt-[39px] h-[58px] w-[308px] md:w-[440px]">
        메인페이지 이동
      </Button>
    </div>
  );
}
