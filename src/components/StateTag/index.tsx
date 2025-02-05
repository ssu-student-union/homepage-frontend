import { useEffect, useState } from 'react';
import { StateTagProps, StateTagType } from './types';
import { ACTIVE_TAG, ANSWERED_TAG, CLOSED_TAG, RECEIVED_TAG } from './const';

export function StateTag({ current }: StateTagProps) {
  const [currentState, setCurrentState] = useState<StateTagType>({
    active: false,
    received: false,
    answered: false,
    closed: false,
  });

  useEffect(() => {
    switch (current) {
      case '진행중':
        setCurrentState((prevState) => {
          return {
            ...prevState,
            active: true,
          };
        });
        break;
      case '접수완료':
        setCurrentState((prevState) => {
          return {
            ...prevState,
            received: true,
          };
        });
        break;
      case '답변완료':
        setCurrentState((prevState) => {
          return {
            ...prevState,
            answered: true,
          };
        });
        break;
      case '종료됨':
        setCurrentState((prevState) => {
          return {
            ...prevState,
            closed: true,
          };
        });
        break;
    }
  }, [current]);

  return (
    <div className="w-[140px] p-[10px]">
      <div className="flex flex-col gap-[50px] border-l-2 border-l-[#CFCFCF] py-[10px] pl-5">
        <ACTIVE_TAG isActive={currentState.active} />
        <RECEIVED_TAG isActive={currentState.received} />
        <ANSWERED_TAG isActive={currentState.answered} />
        <CLOSED_TAG isActive={currentState.closed} />
      </div>
    </div>
  );
}
