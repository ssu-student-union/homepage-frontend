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
      case 'ACTIVE':
        setCurrentState((prevState) => {
          return {
            ...prevState,
            active: true,
          };
        });
        break;
      case 'RECEIVED':
        setCurrentState((prevState) => {
          return {
            ...prevState,
            received: true,
          };
        });
        break;
      case 'ANSWERED':
        setCurrentState((prevState) => {
          return {
            ...prevState,
            answered: true,
          };
        });
        break;
      case 'CLOSED':
        setCurrentState((prevState) => {
          return {
            ...prevState,
            closed: true,
          };
        });
        break;
    }
    console.log(currentState);
  }, []);

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
