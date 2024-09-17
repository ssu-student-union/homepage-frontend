import { useNavigate } from 'react-router-dom';

export function MainHeroSection() {
  const navigate = useNavigate();

  return (
    <div className="absolute z-40 h-full w-full text-primary-foreground">
      <div className="flex h-full flex-col items-center justify-center gap-[10px]">
        <div className="flex flex-col items-center text-center">
          <div className="text-xl font-bold">제 64대 총학생회</div>
          <h1 className="text-[80px] font-black leading-none">US:SUM</h1>
        </div>
        <button
          onClick={() => navigate('/register')}
          className="flex h-[46px] w-[173px] items-center justify-center rounded-full border-[1px] border-white bg-transparent"
        >
          <p className="font-bold">로그인 하러가기</p>
        </button>
      </div>
    </div>
  );
}
