export function MainHeroSection() {
  return (
    <div className="h-full w-full z-40 absolute text-primary-foreground">
      <div className="h-full flex justify-center items-center flex-col gap-[10px]">
        <div className="flex flex-col items-center text-center">
          <div className="text-xl font-bold">제 64대 총학생회</div>
          <h1 className="text-[80px] font-black leading-none">US:SUM</h1>
        </div>
        <button className="bg-transparent border-[1px] rounded-full border-white h-[46px] w-[173px] flex justify-center items-center">
          <p className="font-bold">로그인 하러가기</p>
        </button>
      </div>
    </div>
  );
}
