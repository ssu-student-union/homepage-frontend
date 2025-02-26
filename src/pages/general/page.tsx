import { useParams } from 'react-router-dom';
import { GeneralRegisterSection } from '@/pages/general/containers/GeneralRegisterSection';
import { CertifyErrorSection } from '@/pages/general/containers/CertifyErrorSection';
import { CertifyApplySection } from './containers/CertifyApplySection';
import { Header } from '@/containers/common/Header/Header';
import { State } from '@/containers/common/Header/const/state';
import { TOSSection } from './containers/TOSSection';
import { useTranslation } from 'react-i18next';

export function GeneralRegisterPage() {
  const { sort } = useParams();
  const { t } = useTranslation();

  return (
    <>
      <Header state={State.Onboarding} />
      {sort === 'scouncil' ? (
        <GeneralRegisterSection subSection1={t('onboarding.학생자치기구 로그인')} />
      ) : sort === 'errorcheck' ? (
        <CertifyErrorSection />
      ) : sort === 'errorapply' ? (
        <CertifyApplySection />
      ) : sort === 'tos' ? (
        <TOSSection />
      ) : (
        <GeneralRegisterSection subSection1={t('onboarding.학생 정보 입력')} />
      )}
    </>
  );
}
