import { ThumbsUp } from 'lucide-react';
import { ACTIVE_TAG, ANSWERED_TAG, CLOSED_TAG, RECEIVED_TAG } from '../StateTag/const';
import { useResize } from '@/hooks/useResize';
import { StateTagProps } from '../StateTag/types';

export function PostTextPetition({ current }: StateTagProps) {
  const { width } = useResize();
  const isSmallScreen = width <= 391;
  const renderStatusTag = () => {
    switch (current) {
      case 'ACTIVE':
        return <ACTIVE_TAG isActive={true} />;
      case 'RECEIVED':
        return <RECEIVED_TAG isActive={true} />;
      case 'ANSWERED':
        return <ANSWERED_TAG isActive={true} />;
      case 'CLOSED':
        return <CLOSED_TAG isActive={true} />;
      default:
        return null;
    }
  };

  return (
    <div className="petition-item w-[362px] flex-shrink-0 cursor-pointer rounded-[13px] border border-gray-300 bg-white px-5 py-7 xs:w-[304px] xs:py-[15px]">
      <div className="flex flex-col">
        {renderStatusTag()}
        <div className="mb-[22px] mt-[7px] text-[1.375rem] font-bold text-gray-700 xs:mb-[12px] xs:text-[1rem]">
          대동제 축제 때 에스파 불러주세요
        </div>
        <div className="mb-[14px] text-[1.125rem] font-medium text-gray-500 xs:mb-[9px] xs:text-[0.875rem]">
          대동제가 좋아요. 우리 학교 축제 짱 디혁국 짱짱 우와우와우 히히히 지금이 몇시죠 집에 가고싶어요. YOASIBI가
          대동제에 올 수 있을까요?
        </div>
        <div className="flex justify-between">
          <div className="text-[1.125rem] font-normal text-gray-400 xs:text-[0.875rem]">2023/03/21</div>
          <div className="flex gap-1 text-[#7D7BFF]">
            <span className="cursor-pointer xs:pb-[9px] xs:pt-0">
              <ThumbsUp size={isSmallScreen ? 14 : 22} />
            </span>
            <span className="text-[1.125rem] font-medium xs:text-[0.875rem]">32</span>
          </div>
        </div>
      </div>
    </div>
  );
}
