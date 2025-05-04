import { Link } from 'react-router';
import { KakaoButton } from '@/components/Buttons/KakaoButton';
import { STUDENT_COUNCIL_NAME } from '@/const/studentCouncil';
import { useTranslation } from 'react-i18next';

export function RegisterButtonSection() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center text-center">
        <h1 className="mb-[-10px] text-xs font-normal">{t('onboarding.제65대 총학생회')}</h1>
        <h1 className="text-[56px] font-bold">{STUDENT_COUNCIL_NAME}</h1>
        <KakaoButton />
        <Link to={'/register/scouncil'}>
          <div className="mt-[20px] text-[12px] font-medium not-italic leading-[130%] text-[#828282] underline">
            {t('onboarding.학생자치기구 로그인')}
          </div>
        </Link>
      </div>
    </div>
  );
}
