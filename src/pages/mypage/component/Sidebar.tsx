interface SidebarProps {
  selectedMenu: string;
  setSelectedMenu: (menu: string) => void;
}

export default function Sidebar({ selectedMenu, setSelectedMenu }: SidebarProps) {
  return (
    <aside className="my-10 hidden w-64 border-r border-[#E7E7E7] md:block md:w-56 lg:block xl:block xxl:block">
      <div className="ml-6 p-10 font-bold md:ml-0 md:pr-0 md:text-sm">
        <ul>
          <li
            className={`mb-3 cursor-pointer ${selectedMenu === '내 정보' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            onClick={() => setSelectedMenu('내 정보')}
          >
            내 정보
          </li>
          <li
            className={`mb-3 cursor-pointer ${selectedMenu === '작성 글 보기' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            onClick={() => setSelectedMenu('작성 글 보기')}
          >
            작성 글 보기
          </li>
          <li
            className={`mb-3 cursor-pointer ${selectedMenu === '서비스 공지사항' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            onClick={() => setSelectedMenu('서비스 공지사항')}
          >
            서비스 공지사항
          </li>
        </ul>
      </div>
    </aside>
  );
}
