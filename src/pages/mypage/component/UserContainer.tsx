import { Skeleton } from '@/components/ui/skeleton';
import { useGetUserProfile } from '../profile/hooks/useGetUserProfile';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const UserContainerSkeleton = () => (
  <div className="mx-auto mb-10 mt-16 flex flex-row items-center rounded-2xl border-2 border-[#D9D9D9] bg-white px-10 py-8 xs:mx-[20%] xs:flex-col xs:pb-4 sm:mx-[22%] sm:flex-col md:mx-10 md:py-6 lg:mx-10 xl:mx-10 xxl:mx-10">
    <div className="flex gap-4">
      <Skeleton className="size-24 rounded-full" />
      <div className="flex-col space-y-2 pt-3">
        <Skeleton className="h-5 w-60" />
        <Skeleton className="h-4 w-48" />
      </div>
    </div>
  </div>
);

export default function UserContainer() {
  const { data, isLoading, error } = useGetUserProfile();
  const userData = data;

  if (isLoading) {
    return <UserContainerSkeleton />;
  }

  if (error || !userData) {
    console.log('error : ', error);
    return <div className="p-20">오류가 발생하였습니다.</div>;
  }

  return (
    <div className="w-full px-4">
      {userData.isUnion ? (
        <div className="mx-auto mb-10 mt-16 flex flex-row items-center rounded-2xl border-2 border-[#D9D9D9] bg-white px-10 py-8 xs:mx-[20%] xs:flex-col xs:pb-4 sm:mx-[22%] sm:flex-col md:mx-10 md:py-6 lg:mx-10 xl:mx-10 xxl:mx-10">
          <Avatar className="mr-8 h-24 w-24 xs:mb-4 xs:mr-0 xs:h-20 xs:w-20 sm:mr-0 md:mr-6">
            <AvatarImage src="/image/mypage/profile_img.png" alt="profile_default_img" />
            <AvatarFallback>User</AvatarFallback>
          </Avatar>
          <div className="mb-4">
            <div className="mb-2 flex items-center xs:justify-center sm:mt-6 sm:justify-center md:mt-6">
              <span className="text-lg font-bold">{userData.nickname}</span>
            </div>
            <div className="mb-1 text-sm xs:text-xs sm:mb-3 sm:text-xs md:mb-2">
              <span>{userData.memberCode}</span>
              {userData.majorCode ? <span>•</span> : ''}
              <span>{userData.majorCode}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto mb-10 mt-16 flex flex-row items-center rounded-2xl border-2 border-[#D9D9D9] bg-white px-10 py-8 xs:mx-[20%] xs:flex-col xs:pb-4 sm:mx-[20%] sm:flex-col md:mx-10 md:py-6 lg:mx-10 xl:mx-10 xxl:mx-10">
          <img
            className="mr-8 h-24 w-24 xs:mb-4 xs:mr-0 xs:h-20 xs:w-20 sm:mr-0 md:mr-6"
            src="/image/mypage/profile_img.png"
            alt="profile_default_img"
          />
          <div className="mb-4">
            <div className="mb-2 flex items-center xs:justify-center sm:mt-6 sm:justify-center md:mt-6">
              <span className="text-lg font-bold xs:text-sm sm:text-base">{userData.name}</span>
              <span className="ml-1 mr-1 text-xl font-light"> | </span>
              <span className="text-lg font-bold xs:m-0 xs:text-sm sm:text-base">{userData.studentId}</span>
            </div>
            <div className="mb-1 text-sm xs:text-xs sm:mb-3 sm:text-xs md:mb-2">
              <span>{userData.memberCode}•</span>
              <span>{userData.majorCode}•</span>
              <span>재학</span>
            </div>
            {/* <div className="flex text-sm xs:flex-col xs:items-center xs:text-xs sm:flex-col sm:items-center sm:text-xs md:flex-col">
              <span>총학생회비 납부</span>
              <span className="hidden lg:block xl:block xxl:block"> • </span>
              <span>글로벌미디어학부 학생회비 납부</span>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}
