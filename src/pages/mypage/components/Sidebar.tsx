interface SidebarProps {
  selectedMenu: string;
  setSelectedMenu: (menu: string) => void;
}

export default function Sidebar({ selectedMenu, setSelectedMenu }: SidebarProps) {
  return (
    <aside className="my-10 hidden w-56 border-r border-[#E7E7E7] md:block">
      <div className="ml-6 p-10 font-bold md:ml-0 md:pr-0 md:text-sm">
        <ul>
          <li
            onClick={() => setSelectedMenu('profile')}
            className={`mb-3 cursor-pointer ${selectedMenu === 'profile' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
          >
            내 정보
          </li>
          <li
            onClick={() => setSelectedMenu('myPosts')}
            className={`mb-3 cursor-pointer ${selectedMenu === 'myPosts' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
          >
            작성 글 보기
          </li>
          <li
            onClick={() => setSelectedMenu('service-notice')}
            className={`mb-3 cursor-pointer ${selectedMenu === 'service-notice' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
          >
            서비스 공지사항
          </li>
        </ul>
      </div>
    </aside>
  );
}
