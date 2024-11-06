// import Sidebar from './component/SideBar';
import { useState } from 'react';
import ProfilePage from './profile/page';

// 라우팅 수정 -> default '/mypage/profile' (탭 바뀔 때 마다 바뀌게)

export default function MyPage() {
  const [selectedMenu, setSelectedMenu] = useState('내 정보');

  const renderMenu = () => {
    switch (selectedMenu) {
      case '내 정보':
        return <ProfilePage />;
      case '작성 글 보기':
        return <ProfilePage />;
      case '서비스 공지사항':
        return <ProfilePage />;
    }
  };

  return (
    <div className="mt-24">
      <div>
        <h1 className="mb-5 ml-72 text-2xl font-bold">마이페이지</h1>
        <div className="w-full border-b border-[#E7E7E7]"></div>
        <div className="flex flex-row">
          <aside className="my-10 w-64 border-r border-[#E7E7E7]">
            <div className="p-10 font-bold">
              {/* <h3 className="mb-4 text-lg font-bold text-blue-600">내 정보</h3> */}
              <ul>
                <li
                  className={`mb-2 cursor-pointer ${selectedMenu === '내 정보' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                  onClick={() => setSelectedMenu('내 정보')}
                >
                  내 정보
                </li>
                <li
                  className={`mb-2 cursor-pointer ${selectedMenu === '작성 글 보기' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                  onClick={() => setSelectedMenu('작성 글 보기')}
                >
                  작성 글 보기
                </li>
                <li
                  className={`mb-2 cursor-pointer ${selectedMenu === '서비스 공지사항' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                  onClick={() => setSelectedMenu('서비스 공지사항')}
                >
                  서비스 공지사항
                </li>
              </ul>
            </div>
          </aside>
          <div className="flex-grow">{renderMenu()}</div>
        </div>
      </div>
    </div>
  );
}
