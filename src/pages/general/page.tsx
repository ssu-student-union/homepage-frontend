import { useParams } from 'react-router-dom';
import { GeneralRegisterSection } from '@/pages/general/containers/GeneralRegisterSection';

export function GeneralRegisterPage() {
  const { sort } = useParams();

  return (
    <>
      {sort === 'scouncil' ? (
        <GeneralRegisterSection subSection1={'학생 자치기구 로그인'} buttonSection={'입력 완료'} />
      ) : (
        <GeneralRegisterSection subSection1={'학생 정보 입력'} buttonSection={'입력 완료'} />
      )}
    </>
  );
}
