// import Sidebar from './component/SideBar';
import { useState } from 'react';
import ProfilePage from './profile/page';
import Sidebar from './component/Sidebar';
import DropdownUserMenu from './component/DropdownUserMenu';
import { ServiceNoticePage } from './service-notice/page';
import MyPostsPage from './myPosts/page';

export default function MyPage() {
  const [selectedMenu, setSelectedMenu] = useState('내 정보');
  const [isDropdown, setIsDropdown] = useState(false);

  const renderMenu = () => {
    switch (selectedMenu) {
      case '내 정보':
        return <ProfilePage />;
      case '작성 글 보기':
        return <MyPostsPage />;
      case '서비스 공지사항':
        return <ServiceNoticePage />;
    }
  };

  return (
    <div className="mt-24">
      <div>
        <div className="relative flex xs:justify-center sm:justify-center md:ml-52 md:justify-start lg:ml-72 xl:ml-72 xxl:ml-72">
          <h1 className="mb-5 text-2xl font-bold">마이페이지</h1>
          <button
            className="mb-5 ml-3 hidden items-center xs:block sm:block"
            onClick={() => setIsDropdown(!isDropdown)}
          >
            <img
              src="/image/mypage/arrow_down.png"
              alt="arrow down"
              className={`h-2 w-3 transform transition-transform duration-200 ${isDropdown ? 'rotate-180' : ''}`}
            />
          </button>
          {isDropdown && (
            <div className="absolute top-10">
              <DropdownUserMenu
                selectedMenu={selectedMenu}
                setSelectedMenu={setSelectedMenu}
                setIsDropdown={setIsDropdown}
              />
            </div>
          )}
        </div>
        <div className="w-full border-b border-[#E7E7E7]"></div>
        <div className="flex md:flex-row lg:flex-row xl:flex-row xxl:flex-row">
          <Sidebar selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
          <div className="flex-grow">{renderMenu()}</div>
        </div>
      </div>
    </div>
  );
}
