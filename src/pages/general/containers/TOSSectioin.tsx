import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, CheckCircle } from '@phosphor-icons/react';
import { Dialog, DialogContent, DialogHeader, DialogPortal, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PrivacyContent, ProcessContent, ThirdContent } from '../components/TOSContent';

export function TOSSection() {
  const [checkList, setCheckList] = useState<string[]>([]);
  const [selectedTOS, setSelectedTOS] = useState<string>('');
  const navigate = useNavigate();

  const checkAll = () => {
    if (checkList.length === 3) {
      setCheckList([]);
    } else {
      setCheckList(['privacy', 'service', 'third']);
    }
  };

  const check = (id: string) => {
    if (checkList.includes(id)) {
      setCheckList(checkList.filter((item) => item !== id));
    } else {
      setCheckList([...checkList, id]);
    }
  };

  const isAllChecked = checkList.length === 3;

  const handleNext = () => {
    if (isAllChecked || (checkList.includes('privacy') && checkList.includes('service'))) {
      navigate('/register/onboarding');
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
            <div className="flex items-center justify-start gap-6" onClick={checkAll}>
              <span className="cursor-pointer">
                {isAllChecked ? <CheckCircle size={26} fill="#2F4BF7" weight="fill" /> : <CheckCircle size={26} />}
              </span>
              <div>전체동의하기</div>
            </div>

            <hr className="my-8" />

            <div className="flex-col space-y-7">
              {[
                { id: 'privacy', label: '[필수] 개인정보 수집 • 이용 동의' },
                { id: 'service', label: '[필수] 서비스 이용 약관 동의' },
                { id: 'third', label: '제 3자 정보제공 동의' },
              ].map((item) => (
                <div key={item.id} className="flex justify-between">
                  <div className="flex gap-[16px] xs:gap-[8px] sm:gap-[8px] md:gap-[8px]">
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
                    <button onClick={() => setSelectedTOS(item.id)}>
                      <p className="underline underline-offset-2 hover:text-gray-800">보기</p>
                    </button>
                  </DialogTrigger>
                  <DialogPortal>
                    <DialogContent
                      showOverlay={true}
                      className="fixed left-[50%] top-[50%] z-50 h-[500px] max-h-[800px] w-[800px] translate-x-[-50%] translate-y-[-50%] overflow-y-scroll rounded-[8px] bg-white p-6 shadow-xl xs:w-[300px] xs:text-sm sm:w-[300px]"
                      onOpenAutoFocus={(e) => e.preventDefault()}
                    >
                      <DialogHeader className="mt-10 text-left">
                        <DialogTitle className="mb-7">
                          {selectedTOS === 'privacy'
                            ? '개인정보 수집 및 이용 동의서'
                            : selectedTOS === 'service'
                              ? '서비스 이용 약관 동의서'
                              : '제 3자 정보제공 동의서'}
                        </DialogTitle>
                        {selectedTOS === 'privacy' ? (
                          <PrivacyContent />
                        ) : selectedTOS === 'service' ? (
                          <ProcessContent />
                        ) : (
                          <ThirdContent />
                        )}
                      </DialogHeader>
                    </DialogContent>
                  </DialogPortal>
                </div>
              ))}
            </div>
          </div>
          <button
            className={`mt-10 w-full rounded-md py-3 text-white ${
              isAllChecked || (checkList.includes('privacy') && checkList.includes('service'))
                ? 'bg-[#2F4BF7] hover:bg-blue-600'
                : 'cursor-not-allowed bg-gray-300'
            }`}
            onClick={handleNext}
          >
            다음
          </button>
        </div>
      </div>
    </Dialog>
  );
}
