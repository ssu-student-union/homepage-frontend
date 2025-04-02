import { Button } from '@/components/ui/button';
import { CertifyErrorCheck } from './CertifyErrorCheck';
import { useNavigate } from 'react-router-dom';

export function CertifyErrorSection() {
  const navigate = useNavigate();

  const handleToMain = () => {
    navigate('/');
  };
  return (
    <div className="mt-[260px] grid place-content-center text-center">
      <div className="flex justify-center">
        <CertifyErrorCheck />
      </div>
      <div className="text-[22px] font-bold md:text-[32px]">문의가 접수되었습니다</div>
      <div className="mt-[12px] text-[11px] font-medium md:text-base">
        담당자가 문의 확인 후, 회신 드릴 예정입니다.<br></br>
        이용에 불편을 드려 죄송합니다.
      </div>
      <Button onClick={handleToMain} className="mt-[39px] h-[58px] w-[308px] md:w-[440px]">
        메인페이지 이동
      </Button>
    </div>
  );
}
