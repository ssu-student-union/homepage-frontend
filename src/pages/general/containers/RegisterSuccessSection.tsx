import { Button } from "@/components/ui/button";

export function RegisterSuccessSection() {
  return (
    <div>
            <div className="text-[#2F4BF7] text-[32px] not-italic font-bold leading-[normal] tracking-[-0.96px]">편유나님</div>
            <div className="text-[#000] text-[32px] not-italic font-bold leading-[normal] tracking-[-0.96px]">학생인증이 완료되었어요!</div>
            <div className="w-[435px] h-[1px] stroke-[1px] stroke-[#929292] mt-[20px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="436" height="1" viewBox="0 0 436 1" fill="none">
                    <path d="M0.5 0.5H435.5" stroke="#929292"/>
                </svg>
            </div>
            <div className="flex mt-[20px]">
                <div className="text-[22px] not-italic font-semibold leading-[normal] tracking-[-0.88px]">단과대학</div>
                <div className="text-[22px] not-italic font-normal leading-[normal] tracking-[-0.88px]">IT대학</div>
            </div>
            <div className="flex mt-[12px]">
                <div className="text-[22px] not-italic font-semibold leading-[normal] tracking-[-0.88px]" >학과/부</div>
                <div className="text-[22px] not-italic font-normal leading-[normal] tracking-[-0.88px]">글로벌미디어학부</div>
            </div>

            <div className="mt-[35px]"></div>

            <Button variant={"default"} size={"default"} className="w-[431px] mb-4">로그인</Button>
    </div>
  );
}
