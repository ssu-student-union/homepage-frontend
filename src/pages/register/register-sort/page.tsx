import { useParams } from 'react-router';
import { GeneralLoginSection } from '@/pages/register/register-sort/containers/GeneralLoginSection';
import { CertifyErrorSection } from '@/pages/register/register-sort/containers/CertifyErrorSection';
import { CertifyApplySection } from '@/pages/register/register-sort/containers/CertifyApplySection';
import { Header } from '@/containers/common/Header/Header';
import { State } from '@/containers/common/Header/const/state';
import { TOSSection } from './containers/TOSSection';
import { OnboardingSection } from './containers/OnboardingSection';

export function GeneralRegisterPage() {
  const { sort } = useParams();

  return (
    <>
      <Header state={State.Onboarding} />
      {sort === 'scouncil' ? (
        <GeneralLoginSection />
      ) : sort === 'errorcheck' ? (
        <CertifyErrorSection />
      ) : sort === 'errorapply' ? (
        <CertifyApplySection />
      ) : sort === 'tos' ? (
        <TOSSection />
      ) : (
        <OnboardingSection />
      )}
    </>
  );
}
