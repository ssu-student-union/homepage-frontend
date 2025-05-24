import { Link } from 'react-router';

interface SidebarProps {
  selectedMenu: string;
}

export default function Sidebar({ selectedMenu }: SidebarProps) {
  return (
    <aside className="my-10 hidden w-56 border-r border-[#E7E7E7] md:block">
      <div className="ml-6 p-10 font-bold md:ml-0 md:pr-0 md:text-sm">
        <div className="flex flex-col">
          <Link
            to="/mypage"
            className={`mb-3 cursor-pointer ${selectedMenu === '/mypage' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
          >
            내 정보
          </Link>
          <Link
            to="/mypage/myPosts"
            className={`mb-3 cursor-pointer ${selectedMenu === '/mypage/myPosts' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
          >
            작성 글 보기
          </Link>
          <Link
            to="/mypage/service-notice"
            className={`mb-3 cursor-pointer ${selectedMenu === '/mypage/service-notice' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
          >
            서비스 공지사항
          </Link>
        </div>
      </div>
    </aside>
  );
}
