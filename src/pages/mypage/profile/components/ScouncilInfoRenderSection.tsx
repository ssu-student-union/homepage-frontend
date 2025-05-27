import { Button } from '@/components/ui/button';
import { GetUserProfileResponse } from '@/types/apis/get';

interface InfoRenderSectionProps {
  userData: GetUserProfileResponse;
  setIsEditing: (isEditing: boolean) => void;
}

export default function ScouncilInfoRenderSection({ userData, setIsEditing }: InfoRenderSectionProps) {
  return (
    <div className="mx-[24%] flex flex-col items-start md:mx-16">
      <h3 className="pr-28 text-base font-bold md:text-lg">기본정보</h3>
      <div className="mb-14 grid grid-cols-[2fr_5fr] gap-x-6 gap-y-3 py-6 text-xs md:ml-6 md:text-sm lg:grid-cols-[1fr_5fr]">
        <span className="font-semibold">단위명</span>
        <span>{userData?.memberCode}</span>
        <span className="font-semibold">닉네임</span>
        <span>{userData?.name}</span>
      </div>
      <Button
        onClick={() => setIsEditing(true)}
        className="mb-10 mr-0 self-center rounded-xs border border-gray-400 bg-white px-5 py-1.5 text-center text-xs text-gray-700 hover:bg-gray-100 md:mr-10 md:self-end md:text-sm"
      >
        수정하기
      </Button>
    </div>
  );
}
