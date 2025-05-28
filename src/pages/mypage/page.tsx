import { useState } from 'react';
import Sidebar from './components/Sidebar';
import DropdownUserMenu from './components/DropdownUserMenu';
import { ChevronDown } from 'lucide-react';
import ProfilePage from './profile/page';
import MyPostsPage from './myPosts/page';
import UserContainer from './components/UserContainer';
import { useGetUserProfile } from './profile/hooks/useGetUserProfile';
import ProfileLoadingSkeleton from './profile/components/ProfileLoadingSkeleton';
import UserContainerSkeleton from './profile/components/UserContainerSkeleton';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router';

export default function MyPage() {
  const [searchParams] = useSearchParams();
  const [isDropdown, setIsDropdown] = useState(false);
  const { t } = useTranslation();
  const { data, isLoading, error } = useGetUserProfile();
  const userData = data;
  console.log('userData : ', userData);
  const selectedMenu = searchParams.get('selectedMenu');

  const renderPage = () => {
    switch (selectedMenu) {
      case 'profile':
        return <ProfilePage />;
      case 'myPosts':
        return <MyPostsPage />;
      default:
        return <ProfilePage />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col">
        <UserContainerSkeleton />
        <ProfileLoadingSkeleton />
      </div>
    );
  }

  if (error || !userData) {
    console.log('error : ', error);
    return <div className="p-20">오류가 발생하였습니다.</div>;
  }

  return (
    <div className="mt-24">
      <div>
        <div className="relative flex justify-center md:ml-52 md:justify-start">
          <h1 className="mb-5 text-2xl font-bold">{t('mypage.마이페이지')}</h1>
          <button className="mb-5 ml-3 block items-center md:hidden" onClick={() => setIsDropdown(!isDropdown)}>
            <ChevronDown className="h-4 w-6" color="#9CA3AF" />
          </button>
          {isDropdown && (
            <div className="absolute top-10 z-50">
              <DropdownUserMenu selectedMenu={selectedMenu} setIsDropdown={setIsDropdown} />
            </div>
          )}
        </div>
        <div className="w-full border-b border-[#E7E7E7]"></div>
        <div className="flex">
          <Sidebar selectedMenu={selectedMenu} />
          <main className="grow">
            <div className="flex flex-col">
              <UserContainer userData={userData} />
              {renderPage()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
