import { useParams } from 'react-router-dom';
import { GeneralRegisterSection } from '@/pages/general/containers/GeneralRegisterSection';
import { CertifyErrorSection } from '@/pages/general/containers/CertifyErrorSection'; // CertifyErrorSection 컴포넌트 임포트
import { CertifyApplySection } from './containers/CertifyApplySection';
import { Header } from '@/containers/common/Header/Header';
import { State } from '@/containers/common/Header/const/state';
import { TOSSection } from './containers/TOSSectioin';

export function GeneralRegisterPage() {
  const { sort } = useParams();

  return (
    <>
      <Header state={State.Onboarding} />
      {sort === 'scouncil' ? (
        <GeneralRegisterSection subSection1={'학생 자치기구 로그인'} buttonSection={'입력 완료'} />
      ) : sort === 'errorcheck' ? (
        <CertifyErrorSection />
      ) : sort === 'errorapply' ? (
        <CertifyApplySection />
      ) : sort === 'tos' ? (
        <TOSSection />
      ) : (
        <GeneralRegisterSection subSection1={'학생 정보 입력'} buttonSection={'입력 완료'} />
      )}
    </>
  );
}
