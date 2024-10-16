// import Sidebar from './component/SideBar';
import ProfilePage from './profile/page';

export default function MyPage() {
  return (
    <div className="mt-24">
      <div>
        <h1 className="mb-5 ml-72 text-2xl font-bold">마이페이지</h1>
        <div className="border-#E7E7E7 w-full border-b"></div>
        <div className="flex flex-row">
          <aside className="my-10 w-64 border-r border-gray-300">
            <div className="p-10 font-bold">
              {/* <h3 className="mb-4 text-lg font-bold text-blue-600">내 정보</h3> */}
              <ul>
                <li className="mb-2 cursor-pointer text-gray-700 hover:text-blue-600">내 정보</li>
                <li className="mb-2 cursor-pointer text-gray-700 hover:text-blue-600">작성 글 보기</li>
                <li className="cursor-pointer text-gray-700 hover:text-blue-600">서비스 공지사항</li>
              </ul>
            </div>
          </aside>
          <div className="flex-grow">
            <ProfilePage />
          </div>
        </div>
      </div>
    </div>
  );
}
