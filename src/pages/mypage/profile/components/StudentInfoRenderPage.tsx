import { GetUserProfileResponse } from '@/types/apis/get';
import { Button } from '@/components/ui/button';
interface StudentInfoRenderPageProps {
  userData: GetUserProfileResponse;
  setIsEditing: (isEditing: boolean) => void;
}

export default function StudentInfoRenderPage({ userData, setIsEditing }: StudentInfoRenderPageProps) {
  return (
    <div className="mx-[22%] flex flex-col items-start md:mx-16">
      <h3 className="text-lg font-bold sm:text-base">기본정보</h3>
      <div className="mb-14 grid grid-cols-[2fr_5fr] gap-x-6 gap-y-3 py-6 text-xs md:ml-6 md:text-sm lg:grid-cols-[1fr_5fr]">
        <span className="font-semibold">이름</span>
        <span>{userData?.name}</span>
        <span className="font-semibold">학번</span>
        <span>{userData?.studentId}</span>
      </div>
      <h3 className="text-lg font-bold sm:text-base">학적정보 - 주전공</h3>
      <div className="mb-14 grid grid-cols-[2fr_5fr] gap-x-6 gap-y-3 py-6 text-xs md:ml-6 md:text-sm lg:grid-cols-[1fr_5fr]">
        <span className="font-semibold">단과대학</span>
        <span>{userData?.memberCode}</span>

        <span className="font-semibold">학과/부</span>
        <span>{userData?.majorCode}</span>
      </div>{' '}
      <Button
        onClick={() => setIsEditing(true)}
        className="mb-10 mr-0 self-center rounded-xs border border-gray-400 bg-white px-5 py-1.5 text-center text-xs text-gray-700 hover:bg-gray-100 md:mr-10 md:self-end md:text-sm"
      >
        수정하기
      </Button>
    </div>
  );
}
