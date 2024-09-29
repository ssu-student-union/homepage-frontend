import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, CheckCircle } from '@phosphor-icons/react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function TOSSection() {
  const [checkList, setCheckList] = useState<string[]>([]);
  // const [selectedTOS, setSelectedTOS] = useState<string>('');
  const navigate = useNavigate();

  const checkAll = () => {
    if (checkList.length === 1) {
      setCheckList([]);
    } else {
      setCheckList(['privacy']);
      // setCheckList(['privacy', 'process', 'terms']);
    }
  };

  const check = (id: string) => {
    if (checkList.includes(id)) {
      setCheckList(checkList.filter((item) => item !== id));
    } else {
      setCheckList([...checkList, id]);
    }
  };

  const isAllChecked = checkList.length === 1;

  const handleNext = () => {
    if (isAllChecked) {
      navigate('/emailauth');
    } else {
      alert('필수 동의 항목을 모두 체크해주세요!');
    }
  };

  return (
    <Dialog>
      <div className="flex min-h-screen items-center justify-center overflow-hidden">
        <div className="flex w-full max-w-md flex-col items-center p-4">
          <div className="pb-4 text-2xl font-bold not-italic leading-[normal] text-[rgb(0,0,0)]">약관 동의</div>
          <div className="mt-10 min-w-[336px] flex-col text-gray-500">
            <div className="flex items-center justify-start gap-6">
              <span className="cursor-pointer" onClick={checkAll}>
                {isAllChecked ? <CheckCircle size={26} fill="#2F4BF7" weight="fill" /> : <CheckCircle size={26} />}
              </span>
              <div>전체동의하기</div>
            </div>

            <hr className="my-8" />

            <div className="flex-col space-y-7">
              {[
                { id: 'privacy', label: '[필수] 개인정보 수집 • 이용 동의' },
                // { id: 'process', label: '개인정보 처리 방침 동의' },
                // { id: 'terms', label: '서비스 이용 약관 동의' },
              ].map((item) => (
                <div key={item.id} className="flex justify-between">
                  <div className="flex gap-6">
                    <span className="cursor-pointer" onClick={() => check(item.id)}>
                      {checkList.includes(item.id) ? (
                        <Check size={25} fill="#2F4BF7" weight="bold" />
                      ) : (
                        <Check size={25} />
                      )}
                    </span>
                    <div>{item.label}</div>
                  </div>

                  <DialogTrigger asChild>
                    <button /**onClick={() => setSelectedTOS(item.id)}*/>
                      <p className="underline underline-offset-2 hover:text-gray-800">보기</p>
                    </button>
                  </DialogTrigger>
                  <DialogPortal>
                    <DialogContent
                      showOverlay={true}
                      className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-6 shadow-xl"
                      onOpenAutoFocus={(e) => e.preventDefault()}
                    >
                      <DialogHeader className="mt-10 text-left">
                        <DialogTitle className="mb-10">{'개인정보 수집 및 이용 동의서'}</DialogTitle>
                        <DialogDescription>
                          <PrivacyContent />
                          {/* 수집 항목과 목적, 보유 및 이용기간
                          <br />
                          <br />
                          숭실대학교 총학생회 홈페이지 서비스는 다음의 목적을 위해 이용자가 동의 받은 범위에 한하여
                          개인정보를 수집하고 있습니다.
                          <br />
                          <br />
                          <strong className="relative">1. 회원 가입 및 관리</strong>
                          <span className="absolute left-10 max-w-[390px] pt-6">
                            처리 목적: 회원 가입 확인, 서비스 제공을 위한 본인 식별과 인증
                            <br />
                            필수 항목: 학번, 이름, 단과대학, 학과/부
                            <br />
                            보유 및 이용기간: 수집한 때부터 회원 탈퇴 시까지
                            <br />
                          </span>
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                          <strong className="relative">2. 자동 수집 항목</strong>
                          <span className="absolute left-10 max-w-[420px] pt-6">
                            처리 목적: 숭실대학교 총학생회 홈페이지 서비스 품질 향상을 위한 통계 분석
                            <br />
                            필수 항목: 서비스 이용 과정에서 자동 생성되는 정보(자동 생성되는 임의의 식별자, 서비스 진입
                            시 서비스 방문 이력 및 접속 로그, 접속한 모바일 운영체제)
                            <br />
                            보유 및 이용기간: 수집한 때부터 회원 탈퇴 시까지
                            <br />
                          </span>
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                          <strong>
                            ✽이용자께서는 상기 동의 거부할 수 있습니다. 단, 동의하지 않는 경우 회원 가입 및 숭실대학교
                            총학생회 홈페이지 서비스 제공에 제한을 받을 수 있습니다.
                          </strong> */}
                          {/* {selectedTOS === 'privacy' && '개인정보 수집 및 이용에 대한 상세 내용...'}
                          {selectedTOS === 'process' && '개인정보 처리 방침에 대한 상세 내용...'}
                          {selectedTOS === 'terms' && '서비스 이용 약관에 대한 상세 내용...'} */}
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </DialogPortal>
                </div>
              ))}
            </div>
          </div>
          <button
            className={`mt-10 w-full rounded-md py-3 text-white ${
              isAllChecked || checkList.includes('privacy')
                ? 'bg-[#2F4BF7] hover:bg-blue-600'
                : 'cursor-not-allowed bg-gray-300'
            }`}
            onClick={handleNext}
            disabled={!isAllChecked}
          >
            다음
          </button>
        </div>
      </div>
    </Dialog>
  );
}

const PrivacyContent = () => (
  <div className="text-md space-y-4 text-black">
    <p>수집 항목과 목적, 보유 및 이용 기간</p>
    <p className="text-gray-600">
      숭실대학교 총학생회 홈페이지 서비스는 다음의 목적을 위해 이용자가 동의 받은 범위에 한하여 개인정보를 수집하고
      있습니다.
    </p>
    <div>
      <h3 className="mb-2 font-bold">1. 회원 가입 및 관리</h3>
      <ul className="list-none space-y-1 pl-5 text-gray-600">
        <li>
          <span className="font-semibold">처리 목적:</span> 회원 가입 확인, 서비스 제공을 위한 본인 식별과 인증
        </li>
        <li>
          <span className="font-semibold">필수 항목:</span> 학번, 이름, 단과대학, 학과/부
        </li>
        <li>
          <span className="font-semibold">보유 및 이용기간:</span> 수집한 때부터 회원 탈퇴 시까지
        </li>
      </ul>
    </div>
    <div>
      <h3 className="mb-2 font-bold">2. 자동 수집 항목</h3>
      <ul className="list-none space-y-1 pl-5 text-gray-600">
        <li>
          <span className="font-semibold">처리 목적:</span> 숭실대학교 총학생회 홈페이지 서비스 품질 향상을 위한 통계
          분석
        </li>
        <li>
          <span className="font-semibold">필수 항목:</span> 서비스 이용 과정에서 자동 생성되는 정보(자동 생성되는 임의의
          식별자, 서비스 진입 시 서비스 방문 이력 및 접속 로그, 접속한 모바일 운영체제)
        </li>
        <li>
          <span className="font-semibold">보유 및 이용기간:</span> 수집한 때부터 회원 탈퇴 시까지
        </li>
      </ul>
    </div>
    <p className="pt-2 font-bold">
      ✽이용자께서는 상기 동의 거부할 수 있습니다. 단, 동의하지 않는 경우 회원 가입 및 숭실대학교 총학생회 홈페이지
      서비스 제공에 제한을 받을 수 있습니다.
    </p>
  </div>
);
