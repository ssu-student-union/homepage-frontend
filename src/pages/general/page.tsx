import { useParams } from "react-router-dom";
import { Header, State } from "@/containers/common/Header/Header";
import { RegisterSsuaSection, ResultEnum } from "@/pages/general/containers/RegisterSsuaSection.tsx";
import { GeneralRegisterSection } from "@/pages/general/containers/GeneralRegisterSection";
import { RegisterSuccessSection } from "@/pages/general/containers/RegisterSuccessSection"; // Import the RegisterSuccessSection component
import { RegisterFailedSection } from "./containers/RegisterFailedSections";

export function GeneralRegisterPage() {
  const { sort } = useParams();
  const result = ResultEnum.SUCCESS; // or ResultEnum.FAILED

  return (
    <>
      <Header state={State.LoginPage} />
      {
        sort === 'scouncil'
          ? <GeneralRegisterSection subSection1={'학생 자치기구 로그인'} buttonSection={'입력 완료'} />
            : <GeneralRegisterSection  subSection1={'학생 정보 입력'} buttonSection={'입력 완료'}  />
      }

    </>
  );
}
