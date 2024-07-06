import { Header, State } from "@/containers/common/Header/Header";
import { RegisterSsuaSection, ResultEnum } from "@/pages/general/containers/RegisterSsuaSection.tsx";
import { GeneralRegisterSection } from "@/pages/general/containers/GeneralRegisterSection.tsx";


export function GeneralRegisterPage() {
  const result = ResultEnum.SUCCESS; // or ResultEnum.FAILED

  return (
    <>
      <Header state={State.LoginPage}  />
      <GeneralRegisterSection firstInput={'이름'} secondInput={'학번'} subSection1={'학생 정보 입력'} buttonSection={'입력 완료'}  />
      <RegisterSsuaSection result={result} />
    </>
  );
}
