import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";

export function RegisterButtonSection() {
    return (
      <div style={{ minHeight: '0vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflowY:'hidden' }}>
        <div className="flex flex-col items-center text-center">
          <h1 className="font-normal mb-[-10px]">64대 숭실대학교 총학생회</h1>
          <h1 className="text-[56px] font-bold">US:SUM</h1>
          <Button variant={"kakao"} size={"lg"}>카카오 로그인</Button>
          <Link to={'/register/scouncil'}>
              <div className="text-[#828282] text-[12px] not-italic font-medium leading-[130%] underline mt-[20px]">학생자치기구 로그인</div>
          </Link>  
        </div>
      </div>
    );
  }
  