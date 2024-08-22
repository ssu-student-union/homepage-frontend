import { useParams } from 'react-router-dom';
import { GeneralRegisterSection } from '@/pages/general/containers/GeneralRegisterSection';
import { CertifyErrorSection } from '@/pages/general/containers/CertifyErrorSection'; // CertifyErrorSection 컴포넌트 임포트
import { CertifyApplySection } from './containers/CertifyApplySection';

export function GeneralRegisterPage() {
  const { sort } = useParams();

  return (
    <>
      {sort === 'scouncil' ? (
        <GeneralRegisterSection subSection1={'학생 자치기구 로그인'} buttonSection={'입력 완료'} />
      ) : sort === 'errorcheck' ? (
        <CertifyErrorSection /> // sort가 'errorcheck'일 때 CertifyErrorSection 렌더링
      ) : sort === 'errorapply' ? (
        <CertifyApplySection /> // sort가 'errorapply'일 때 CertifyErrorSection을 applyError prop과 함께 렌더링
      ) : (
        <GeneralRegisterSection subSection1={'학생 정보 입력'} buttonSection={'입력 완료'} />
      )}
    </>
  );
}
