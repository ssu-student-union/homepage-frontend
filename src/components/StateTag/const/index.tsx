import { ActiveTagProps } from '../types';
import { Spinner, CheckCircle, ChatTeardropText, ClockCountdown } from '@phosphor-icons/react';

export function ACTIVE_TAG({ isActive }: ActiveTagProps) {
  const active_Style = `flex gap-1 ${isActive ? 'text-indigo-500' : 'text-gray-400'}`;
  return (
    <div className={active_Style}>
      <span className="pt-1">
        <Spinner size={18} />
      </span>
      <p className="inline-block pt-[2px] align-middle text-[14px]">진행중</p>
    </div>
  );
}

export function RECEIVED_TAG({ isActive }: ActiveTagProps) {
  const received_Style = `flex gap-1 ${isActive ? 'text-indigo-500' : 'text-gray-400'}`;
  return (
    <div className={received_Style}>
      <span className="pt-1">
        <CheckCircle size={18} />
      </span>
      <p className="inline-block pt-[2px] align-middle text-[14px]">접수완료</p>
    </div>
  );
}

export function ANSWERED_TAG({ isActive }: ActiveTagProps) {
  const answered_Style = `flex gap-1 ${isActive ? 'text-indigo-500' : 'text-gray-400'}`;
  return (
    <div className={answered_Style}>
      <span className="pt-1">
        <ChatTeardropText size={18} />
      </span>
      <p className="inline-block pt-[2px] align-middle text-[14px]">답변완료</p>
    </div>
  );
}

export function CLOSED_TAG({ isActive }: ActiveTagProps) {
  const closed_Style = `flex gap-1 ${isActive ? 'text-gray-500' : 'text-gray-400'}`;
  return (
    <div className={closed_Style}>
      <span className="pt-1">
        <ClockCountdown size={18} />
      </span>
      <p className="inline-block pt-[2px] align-middle text-[14px]">종료됨</p>
    </div>
  );
}
